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
  const popularPostEdges = data.popularPost.edges;
  return (
    <Layout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <Hero />
          <Header>Popular articles</Header>
          <PostListing postEdges={popularPostEdges} />
          <Header>All articles</Header>
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
  query LandingQuery {
    allMarkdownRemark: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { isDraft: { eq: false } } }
      ) {
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedSlug
            pageview
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
    popularPost: allMarkdownRemark(
      sort: { fields: [fields___pageview], order: DESC }
      filter: { fields: { isDraft: { eq: false } } }
      limit: 7
      ) {
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedSlug
            pageview
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
