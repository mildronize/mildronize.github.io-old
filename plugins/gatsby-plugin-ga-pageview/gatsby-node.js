const { getUuidPageView } = require("./ga-pageview");
let uuidPageView;

exports.onPreInit = async () => {
  uuidPageView = await getUuidPageView();
}

exports.onCreateNode = async ({ actions, node }, options) => {
  const { type } = node.internal;
  const { createNodeField } = actions;
  if(type !== 'MarkdownRemark') return;
  let pageview = 0;
  if (uuidPageView){
    let postUuid = '';
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "uuid")) {
        postUuid = node.frontmatter.uuid;
      }
    }
    pageview = uuidPageView[postUuid];
  } else {
    console.warn('No uuidPageView');
  }

  createNodeField({
    node,
    name: "pageview",
    value: parseInt(pageview) || 0,
  });

};
