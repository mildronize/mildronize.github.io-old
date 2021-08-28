import dotenv from 'dotenv';
import { google } from 'googleapis';
import DataStore from './data-store';

const reporting = google.analyticsreporting('v4');

dotenv.config();
const clientEmail = process.env.GA_CLIENT_EMAIL;
const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/gm, '\n');
const storePath = './scripts/build/pageview.json';
const storeDebugPath = './scripts/build/debug-pageview.json';

/**
  Option:
  process.argv
    debug

  default: do nothing
*/

const firstArg = process.argv[2];
const isDebugMode = firstArg === 'debug';

const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

const jwt = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  scopes
);

const view_id = '101792950';

async function getReports(reports) {

  await jwt.authorize();
  const request = {
    'headers': { 'Content-Type': 'application/json' }, 'auth': jwt, 'resource': reports
  };
  // https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
  return await reporting.reports.batchGet(request);

};

const basic_report = {
  // https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
  'reportRequests': [
    {
      'viewId': view_id,
      'dateRanges': [{ 'startDate': '2021-08-13', 'endDate': 'today' }],
      'metrics': [{ 'expression': 'ga:pageviews' }],
      'dimensions': [{ 'name': 'ga:pagePath' }]
    }
  ]
};

function getUuidFromPathname(pathname: string) {

  const splits = pathname.replace(/^\//, '').split('/');
  let slugs;

  // is Draft Url
  if (/^\/draft\//.test(pathname)) {
    slugs = splits[1].split('-');
  } else {
    slugs = splits[0].split('-');
  }
  const urlSlug = slugs[slugs.length - 1].split('?');
  return urlSlug[0];
}

interface PageView {
  pagePath: string;
  pageView: number;
}

async function getPageViewList() {
  const result: PageView[] = [];
  const data = (await getReports(basic_report)).data;
  data.reports[0].data.rows.forEach(element => {
    if (!element.dimensions[0]) return;
    result.push({
      pagePath: element.dimensions[0],
      pageView: parseInt(element.metrics[0].values[0]) || 0
    })
  });
  return result;
}

export async function getUuidPageView(pageViewList: PageView[]) {
  const slugDict: Record<string, any> = {};
  // const pageViewList = await getPageViewList();
  pageViewList.forEach(item => {
    const slug = getUuidFromPathname(item.pagePath);
    if (slug === '') return;
    if (slug in slugDict) {
      slugDict[slug] = parseInt(slugDict[slug]) + item.pageView;
    } else {
      slugDict[slug] = item.pageView;
    }
  });
  return slugDict;
}


async function main() {
  console.log(`Running ga-pageview [mode] isDebugMode: ${isDebugMode}`);
  const pageViewList = await getPageViewList();
  const uuidPageView = await getUuidPageView(pageViewList);
  const store = new DataStore(storePath);
  await store.saveData(uuidPageView);
  if (isDebugMode) {
    const storeDebug = new DataStore(storeDebugPath);
    await storeDebug.saveData(pageViewList);
  }
}

main();
