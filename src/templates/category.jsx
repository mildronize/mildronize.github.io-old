import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default function CategoryTemplate({ pageContext, data }) {
  const { category } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <PostListing postEdges={postEdges} />
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category } },
        fields: { isDraft: { eq: false } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedSlug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;
