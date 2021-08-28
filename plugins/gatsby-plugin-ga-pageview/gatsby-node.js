const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
let uuidPageView;
const storePath = "./scripts/build/pageview.json";

exports.onPreInit = async () => {
  uuidPageView = JSON.parse(await readFile(path.resolve(storePath), "utf8"));
};

exports.onCreateNode = async ({ actions, node }, options) => {
  const { type } = node.internal;
  const { createNodeField } = actions;
  if (type !== "MarkdownRemark") return;
  console.log(type)
  let pageview = 0;
  if (uuidPageView) {
    let postUuid = "";
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "uuid")) {
        postUuid = node.frontmatter.uuid;
        pageview = postUuid in uuidPageView? uuidPageView[postUuid]: 0;
      }
    }
  } else {
    console.warn("No uuidPageView");
  }

  createNodeField({
    node,
    name: "pageview",
    value: parseInt(pageview) || 0,
  });
};
