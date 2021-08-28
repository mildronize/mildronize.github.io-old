import DataStore from './data-store';

const oldRawPageViewPath = './scripts/old-raw-pageview.json';
const oldPageViewPath = './scripts/old-pageview-before-2021-08-12.json';

/**
 * For resolving old pathname
 * @param pathname
  * Possible old pathname
  * from 2014-01-01 until 2021-08-12
  * /b/server-side-rendering-in-spa-and-seo
  * /blog/git-trick-how-to-merge-some-files-from-other-branch-th/
  * /demo/responsive-expanding-search-bar
  * /en/a-very-short-ubuntu-debian-packages-installation/
  * /posts/2018-09-17-99-score-google-insight-web-optimization/
  * /th/2015/06/20/error-github-page-build-failure/
  * /th/promise-async-await-rxjs-js-es6/?fbclid=IwAR0sMdgsXc9j3OE8JCNGU6LSOEWNz13jzIW3xy1DYmEn1YuwbvrLO5SUQGo
  * /th/what-i-get-from-master-degree/?fbclid=IwAR1fDEuu6AzDgiDVgau7lh1ORTqZGyS9DBrF1WWiJaQve2zTRZh931a2U2E
  * /2015/07/02/How-to-compile-and-install-gnome-builder-on-debian/
 */

 function getSlugFromPathname(pathname: string){
  // /th/promise-async-await-rxjs-js-es6/?fbclid=IwAR0sMdgsXc9j3OE8JCNGU6LSOEWNz13jzIW3xy1DYmEn1YuwbvrLO5SUQGo
  // Remove query params
  let path = pathname.replace(/^\//, '').split('?')[0].replace(/\/$/, '');
  // th/promise-async-await-rxjs-js-es6
  const splits = path.split('/');
  path = splits[splits.length - 1];
  // 2018-09-17-99-score-google-insight-web-optimization
  const dateOfFile = /^\d\d\d\d-\d\d-\d\d-/;
  path = path.replace(dateOfFile, '');
  // 99-score-google-insight-web-optimization
  return path;
}

export async function getSlugPageView(){
  const slugDict: Record<string, any> = {};
  const store = new DataStore(oldRawPageViewPath);
  const oldPageViews = (await store.getAll()) as PageView[];
  oldPageViews.forEach(item => {
    const slug = getSlugFromPathname(item.pagePath);
    if (slug in slugDict) {
      slugDict[slug] = parseInt(slugDict[slug]) + item.pageView;
    } else {
      slugDict[slug] = item.pageView;
    }
  });

  (new DataStore(oldPageViewPath)).saveData(slugDict);
}

getSlugPageView();
