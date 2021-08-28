import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import PostListing from "../components/PostListing/PostListing";
import Hero from "../components/Hero";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

function Landing({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <Header>All draft articles</Header>
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    </Layout>
  );
}

export default Landing;

const Header = styled.h4`
  font-family: var(--font-family-inter);
  /* font-weight: 500; */
  font-size: 1.4rem;

  ${breakpoint('tablet')`
      font-size: 1.5rem;
    `}
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DraftQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { isDraft: { eq: true } } }
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
