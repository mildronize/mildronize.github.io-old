const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
let uuidPageView;
let slugPageView;
const storePath = "./scripts/build/pageview.json";
const storeOldSlugPath = "./scripts/old-pageview-before-2021-08-12.json";

function getFilename(fileNode) {
  // TODO: Duplicate with gatsby node root.
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
  uuidPageView = JSON.parse(await readFile(path.resolve(storePath), "utf8"));
  slugPageView = JSON.parse(
    await readFile(path.resolve(storeOldSlugPath), "utf8")
  );
};

exports.onCreateNode = async ({ actions, node, getNode }, options) => {
  const { type } = node.internal;
  const { createNodeField } = actions;
  if (type !== "MarkdownRemark") return;
  let pageview = 0;
  if (uuidPageView) {
    let postUuid = "";
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "uuid")) {
        postUuid = node.frontmatter.uuid;
        pageview = postUuid in uuidPageView ? uuidPageView[postUuid] : 0;
      }
    }
  } else {
    console.warn("No uuidPageView");
  }

  /**
   * Processing old path page view.
   */

  const filename = getFilename(getNode(node.parent));

  if (slugPageView && filename) {
    pageview += filename in slugPageView ? slugPageView[filename] : 0;
    console.log(filename, pageview);
  }

  createNodeField({
    node,
    name: "pageview",
    value: parseInt(pageview) || 0,
  });
};
