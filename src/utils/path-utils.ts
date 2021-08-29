import excerptHtml from 'excerpt-html';

// For social card generate
// See more: /plugins/gatsby-plugin-social-sharing-cards/index.js
export const generateCoverImageUrl = (fieldSlug: string) => `/s/${fieldSlug}/cover.jpg`;

interface MarkdownRemarkData {
  edges: {
    node: {
      fields: {
        slug: string
        renderedPathname: string
      }
    }
  }[]
}

export const findRenderedPathname = (urlSlug: string, markdownRemarkData: MarkdownRemarkData): string => {
  const foundNodes = markdownRemarkData.edges.filter(edge => urlSlug === edge.node.fields.slug);
  if (foundNodes.length > 0)
    return foundNodes[0].node.fields.renderedPathname;
  return '';
}

/**
 * @param pathname Should be gotten from `window.location.pathname`
 * pathname will be like: `/react-import-export-component-pattern-whaab42`
 * The last string will be uuid: whaab42
 */

export const extractUuidFromPathname = (pathname: string): string => {
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


export const convertHtmlToExcerpt = (htmlCode: string) => {
  // 140 chars for thai, 55 for eng
  return excerptHtml(htmlCode, {
    stripTags:   true, // Set to false to get html code
    pruneLength: 140, // Amount of characters that the excerpt should contain
    pruneString: '…', // Character that will be added to the pruned string
    pruneSeparator: ' ', // Separator to be used to separate words
  })
}
