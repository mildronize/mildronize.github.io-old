import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import PageTitle from "../components/PageTitle";
import Layout from "../layout/PageLayout";
import PostListing from "../components/PostListing/PostListingByYear";
import Hero from "../components/Hero";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

function BlogListPage({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <PageTitle>All Posts</PageTitle>
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    </Layout>
  );
}

export default BlogListPage;

// const Header = styled.h4`
//   font-family: var(--font-family-inter);
//   /* font-weight: 500; */
//   font-size: 1.4rem;

//   ${breakpoint('tablet')`
//       font-size: 1.5rem;
//     `}
// `;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogListPageQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { isDraft: { eq: false } } }
      ) {
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedPathname
            isDraft
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
