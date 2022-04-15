/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

// 2021-08-05-migrate-react-class-component-to-functional-component
const dateOfFile = /^\d\d\d\d-\d\d-\d\d-/;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let readableSlug;
  let isDraft = false;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // Mark draft file
    if(/^_draft/.test(parsedFilePath.dir)) {
      isDraft = true;
    }

    // Get slug from `title` field
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      readableSlug = `/${_.kebabCase(node.frontmatter.title)}`;
    }else if (parsedFilePath.dir === "") {
      readableSlug = `/${parsedFilePath.name.replace(dateOfFile,'')}/`;
    } else {
      readableSlug = `/${parsedFilePath.dir.replace(dateOfFile,'')}/`;
    }

    // Get slug from both dir and its file name
    // if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
    //   readableSlug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    // }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        readableSlug = `/${_.kebabCase(node.frontmatter.slug)}`;

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      } else {
        // Replace `gatsby-plugin-pathdata`

        /*
        If structure markdown files as a directory
          ```
          ./2015-05-07-responsive-expanding-search-bar
            └── readme.md (any file, use info from parent)
          ```
        Use info from dir name not file name , extract date and filename

        Note: This allow only one markdown file per parent dir like /^(\d+-\d+-\d+)-([\w-]+)$/
        */
        const filenameRegex = /^(\d+-\d+-\d+)-([\w-]+)$/;
        let actualFilename = parsedFilePath.name;
        const split = parsedFilePath.dir.split('/');
        const parentDirectory = split[split.length - 1];
        if(filenameRegex.test(parentDirectory)){
          actualFilename = parentDirectory;
        }
        const nodeDate = actualFilename.replace(filenameRegex, '$1');
        const nodeFilename = actualFilename.replace(filenameRegex, '$2');
        createNodeField({ node, name: "date", value: nodeDate });
        createNodeField({ node, name: "filename", value: nodeFilename });
      }
    }

    if(!Object.prototype.hasOwnProperty.call(node.frontmatter, "uuid")){
      const warnMsg = 'No field `uuid`, please run `npm run uuid `';
      if(process.env.NODE_ENV === 'production'){
        throw new Error(warnMsg);
      }
      console.warn(warnMsg);
    }

    /* eslint new-cap: "off" */
    // Trim Fallback UUID only 32 chars, for preventing too-long URL problem
    // Convert to base64 because when the Gatsby restart, it should return same URL
    const tmpUuid = new Buffer.from(readableSlug).toString('base64');
    const maxLength = tmpUuid.length > 32 ? 32: tmpUuid.length;
    const fallbackUuid = encodeURI(tmpUuid.substring(0, maxLength));

    const nodeSlug = node.frontmatter.uuid || fallbackUuid;
    const nodeReadableSlug = readableSlug.replace(/^\//,'').replace(/\/$/,'');
    const draftSlug = isDraft? 'draft/': '';

    createNodeField({ node, name: "isDraft", value: isDraft });
    createNodeField({ node, name: "slug", value: nodeSlug });  // No starting and trailing slash ex: whaab42
    createNodeField({ node, name: "readableSlug", value: nodeReadableSlug });
    // Render Path
    createNodeField({ node, name: "renderedPathname", value: `/${draftSlug}${nodeReadableSlug}-${nodeSlug}/` }); // Add trailing slash for FB open graph
    createNodeField({ node, name: "shortPathname", value: `/s/${nodeSlug}/` }); // Add trailing slash for preventing redirect
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const postShortUrlPage = path.resolve("src/templates/postShortUrl.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  // const allTagsPage = path.resolve("src/templates/tags.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/PostListingPagination.jsx");
  const landingPage = path.resolve("./src/templates/landing.jsx");
  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            filename
            slug
            readableSlug
            renderedPathname
            isDraft
            shortPathname
          }
          frontmatter {
            title
            tags
            category
            date
          }
        }
      }
    }
  }

  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }


  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.fields.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.fields.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  const { postsPerPage } = siteConfig;
  if (postsPerPage) {
    const pageCount = Math.ceil(postsEdges.length / postsPerPage);

    [...Array(pageCount)].forEach((_val, pageNum) => {
      createPage({
        path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
        component: listingPage,
        context: {
          limit: postsPerPage,
          skip: pageNum * postsPerPage,
          pageCount,
          currentPageNum: pageNum + 1,
        },
      });
    });
  } else {
    // Load the landing page instead
    createPage({
      path: `/`,
      component: landingPage,
    });
  }

  const categorySet = new Set();
  const tagMap = {}

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        const tagKebabCase = _.kebabCase(tag);
        if(!tagMap.hasOwnProperty(tagKebabCase)){
          tagMap[tagKebabCase] = {
            count: 1,
            path: `/tags/${tagKebabCase}/`
          }
        } else
          tagMap[tagKebabCase].count ++;
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.renderedPathname,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });

    // Render short Url page for SEO
    createPage({
      path: edge.node.fields.shortPathname,
      component: postShortUrlPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });

  });

  // createPage({
  //   path: '/tags',
  //   component: allTagsPage,
  //   context: { data: tagMap },
  // });

  //  Create tag pages
  Object.keys(tagMap).forEach((tag) => {
    createPage({
      path: tagMap[tag].path,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};

// We need custom 404 page in non-production mode, for redirecting to the actual page.
// https://github.com/gatsbyjs/gatsby/issues/16112
exports.onCreatePage = ({ page, actions }) => {
  if (process.env.NODE_ENV !== `production` && page.path === `/404/`) {
    const { createPage } = actions
    // Make the 404 page match everything client side.
    // This will be used as fallback if more specific pages are not found
    /* eslint no-param-reassign: off */
    page.matchPath = `/*`
    createPage(page)
  }
}
