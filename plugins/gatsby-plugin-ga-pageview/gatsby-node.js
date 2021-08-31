const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
let uuidPageView;
let slugPageView;
let mediumPageView;
// This path will be ignore by Git
const storePath = "./scripts/build/pageview.json";
const mediumPath = "./scripts/data/pageview-medium.json"
const storeOldSlugPath = "./scripts/data/old-pageview-before-2021-08-12.json";

// TODO: Duplicate with gatsby node root.
function getFilename(fileNode) {
  const parsedFilePath = path.parse(fileNode.relativePath);
  const filenameRegex = /^(\d+-\d+-\d+)-([\w-]+)$/;
  let actualFilename = parsedFilePath.name;
  const split = parsedFilePath.dir.split('/');
  const parentDirectory = split[split.length - 1];
  if(filenameRegex.test(parentDirectory)){
    actualFilename = parentDirectory;
  }
  return actualFilename.replace(filenameRegex, '$2');
}

exports.onPreInit = async () => {
  try{
    uuidPageView = JSON.parse(await readFile(path.resolve(storePath), "utf8"));
  } catch(error){
    console.warn('No uuidPageView' ,error);
  }
  try{
    slugPageView = JSON.parse(
      await readFile(path.resolve(storeOldSlugPath), "utf8")
    );
  } catch(error){
    console.warn('No slugPageView' ,error);
  }
  try{
    mediumPageView = JSON.parse(
      await readFile(path.resolve(mediumPath), "utf8")
    );
  } catch(error){
    console.warn('No mediumPageView' ,error);
  }
};

exports.onCreateNode = async ({ actions, node, getNode }, options) => {
  const { type } = node.internal;
  const { createNodeField } = actions;
  if (type !== "MarkdownRemark") return;
  let pageview = 0;
  let postUuid = "";
  if (uuidPageView) {
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "uuid")) {
        postUuid = node.frontmatter.uuid;
        pageview = postUuid in uuidPageView ? uuidPageView[postUuid] : 0;
      }
    }
  }

  /**
   * Processing old path page view.
   */

  const filename = getFilename(getNode(node.parent));
  if (slugPageView && filename) {
    pageview += filename in slugPageView ? slugPageView[filename] : 0;
  } else {
    console.warn('no filename');
  }

  /**
   * Processing medium page view.
   */
  if(mediumPageView && mediumPageView.stats){
    pageview += postUuid in mediumPageView.stats ? mediumPageView.stats[postUuid].pageView : 0;
  }

  createNodeField({
    node,
    name: "pageview",
    value: parseInt(pageview) || 0,
  });
};
