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
