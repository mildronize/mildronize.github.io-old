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

function Search({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <>
       <PostListing postEdges={postEdges} />
    </>
  );
}

export default Search;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query SearchQuery {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
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
