import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link, navigate } from "gatsby";
import "./prism-template.css";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";


/**
 * This component will render only SEO info, then redirect to actual post.
 */

const getRenderedSlug = (urlSlug, data) => {
  const foundNodes = data.allMarkdownRemark.edges.filter(edge => urlSlug === edge.node.fields.slug);
  if (foundNodes.length > 0)
    return foundNodes[0].node.fields.renderedSlug;
  return '';
}

export default function PostShortUrlTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const { isDraft } = data.markdownRemark.fields;
  if (!post.id) {
    post.id = slug;
  }
  const targetUrl = getRenderedSlug(slug, data);

  useEffect(() => {
    if(targetUrl !== '') navigate(targetUrl);
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        {!isDraft && <SEO postPath={slug} postNode={postNode} postSEO />}
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
      }
      fields {
        slug
        date
        readableSlug
        isDraft
      }
    }
    allMarkdownRemark: allMarkdownRemark {
      edges {
        node {
          fields {
            filename
            slug
            readableSlug
            renderedSlug
            isDraft
          }
        }
      }
    }
  }

`;
