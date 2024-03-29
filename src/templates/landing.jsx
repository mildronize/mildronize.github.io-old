import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import PageLayout from "../layout/PageLayout";
import PostListing from "../components/PostListing/PostListing";
import CoverPostListing from "../components/PostListing/CoverPostListing";
import SidePostListing from "../components/PostListing/SidePostListing";
import Hero from "../components/Hero";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import { onMobile, onTablet, useResponsive } from "../themes/responsive";
import Books from "../components/Books";

function Landing({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  const popularPostEdges = data.popularPost.edges;
  const trendingPostEdges = data.trendingPost.edges;
  const { isMobile } = useResponsive();
  console.log(onMobile);
  return (
    <PageLayout wide>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <TwoColumnLayout>
            <TwoColumnItem main>
              {isMobile && <Hero />}
              <Header>My Books (Thai)</Header>
              <Books />
              <Header>Recent posts</Header>
              <HorizontalDivider/>
              <CoverPostListing postEdges={postEdges} />
            </TwoColumnItem>
            <TwoColumnItem>
              {!isMobile && <Hero />}
              <Header>Trending posts</Header>
              <SubHeader>A Month Earlier</SubHeader>
              <HorizontalDivider/>
              <SidePostListing postEdges={trendingPostEdges} trending />
              <Header style={{marginTop:'65px'}}>Popular posts</Header>
              <SubHeader>Lifetime</SubHeader>
              <HorizontalDivider/>
              <SidePostListing postEdges={popularPostEdges} />
            </TwoColumnItem>
          </TwoColumnLayout>
        </div>
      </div>
    </PageLayout>
  );
}

export default Landing;

const TwoColumnLayout = styled.div`
  display: flex;
  ${onMobile} {
    flex-direction: column;
  }
`;

const TwoColumnItem = styled.div`
  padding-right: ${(p) => (p.main ? 45 : 0)}px;
  margin-right: ${(p) => (p.main ? 45 : 0)}px;
  border-right: ${(p) => (p.main ? '1px solid var(--colors-text-4)' : 0)};
  width: ${(p) => (p.main ? 70 : 30)}%;
  ${onMobile} {
    width: 100%;
    padding: 0;
    padding-right: 0;
    margin-right: 0;
    border-right: 0;
  }
`;

const HorizontalDivider = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SubHeader = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
  text-transform: lowercase;
  font-family: var(--font-family-inter);
  /* font-weight: 500; */
  font-size: 0.7rem;

  ${onTablet} {
    font-size: 0.8rem;
  }
`;

const Header = styled.h4`
  /* margin-top: 55px; */
  margin-bottom: 0;
  text-transform: uppercase;
  font-family: var(--font-family-inter);
  /* font-weight: 500; */
  font-size: 0.8rem;

  ${onTablet} {
    font-size: 0.9rem;
  }
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMarkdownRemark: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { isDraft: { eq: false } } }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedPathname
            pageview
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            unsplashImgCoverId
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
            renderedPathname
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
    trendingPost: allMarkdownRemark(
      sort: { fields: [fields___trendingPageview], order: DESC }
      filter: { fields: { isDraft: { eq: false } } }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
            date
            readableSlug
            renderedPathname
            pageview
            trendingPageview
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
