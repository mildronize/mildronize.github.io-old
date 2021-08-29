import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link, navigate } from "gatsby";
import "./prism-template.css";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import { generateCoverImageUrl, findRenderedPathname, convertHtmlToExcerpt } from "../utils/path-utils";

/**
 * This component will render only SEO info, then redirect to actual post.
 */

export default function PostShortUrlTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  // Broken excerpt from GraphQL, use this way to get excerpt
  const postExcerpt = convertHtmlToExcerpt(postNode.html);
  const { unsplashImgCoverId } = data.markdownRemark.frontmatter;
  const { isDraft, slug : fieldSlug, shortPathname } = data.markdownRemark.fields;
  if (!post.id) {
    post.id = slug;
  }
  const targetUrl = findRenderedPathname(slug, data.allMarkdownRemark);

  useEffect(() => {
    if(targetUrl !== '') navigate(targetUrl);
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        {!isDraft && <SEO
          postPath={shortPathname}
          shortUrl={shortPathname}
          postNode={postNode}
          postExcerpt={postExcerpt}
          postSEO
          coverPath={generateCoverImageUrl(fieldSlug)}
          postUnsplashImgCoverId={unsplashImgCoverId}
          />}
      </div>
    </>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostShortUrlBySlug($slug: String!) {
    markdownRemark: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        category
        tags
        unsplashImgCoverId
      }
      fields {
        slug
        date
        readableSlug
        isDraft
        shortPathname
      }
    }
    allMarkdownRemark: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
            renderedPathname
          }
        }
      }
    }
  }

`;
