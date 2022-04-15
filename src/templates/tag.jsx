import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import PageTitle from "../components/PageTitle";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";
import { Link } from "gatsby";
import styled from 'styled-components';

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Container>
        <Helmet title={`Posts tagged as “${tag.displayName}” | ${config.siteTitle}`} />
        <PageTitle><Link to="/tags" >All Tags</Link><i class="fas fa-angle-right"></i>{`“${tag}”`}</PageTitle>
        <PostListing postEdges={postEdges} />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  i {
    padding-right: 15px;
    padding-left: 25px;
  }
`;


/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } },
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
            renderedPathname
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
