const { google } = require('googleapis');
const reporting = google.analyticsreporting('v4');
const clientEmail = process.env.GA_CLIENT_EMAIL;
const privateKey = process.env.GA_PRIVATE_KEY;
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

const jwt = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  scopes
);

const view_id = '101792950';

const getReports = async function(reports) {

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
      'dateRanges': [{ 'startDate': '2021-01-01', 'endDate': 'today' }],
      'metrics': [{ 'expression': 'ga:pageviews' }],
      'dimensions': [{ 'name': 'ga:pagePath' }]
    }
  ]
};

function getSlugFromPathname(pathname){
  const splits = pathname.replace(/^\//, '').split('/');
  let slugs;

  // is Draft Url
  if(/^\/draft\//.test(pathname)){
    slugs = splits[1].split('-');
  } else {
    slugs = splits[0].split('-');
  }
  const urlSlug = slugs[slugs.length - 1];
  return urlSlug;
}

async function getPageViewList() {
  const result = [];
  const data = (await getReports(basic_report)).data;
  data.reports[0].data.rows.forEach(element => {
    if(!element.dimensions[0]) return;
    result.push({
      pagePath: element.dimensions[0],
      pageView: element.metrics[0].values[0] || 0
    })
    // console.log(`path: '${element.dimensions[0]} (${element.metrics[0].values[0]})'`)
  });
  return result;
}
async function getUuidPageView() {
  const slugDict = {};
  const pageViewList = await getPageViewList();
  pageViewList.forEach( pageView => {
    const slug = getSlugFromPathname(pageView.pagePath);
    if(!(slug in slugDict)){
      slugDict[slug] = pageView.pageView;
    }
  });
  return slugDict;
}

module.exports = { getUuidPageView };

