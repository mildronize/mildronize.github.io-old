import React, {useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link, navigate } from "gatsby";
import _ from "lodash";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";
import numeral from 'numeral';

import "./prism-template.css";
import SEO from "../components/SEO/SEO";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import config from "../../data/SiteConfig";
import globalConfig from "../../data/globalConfig";
import Person from '../components/Person';
import Layout from "../layout/PageLayout";
import ShareButton from "../components/ShareButton";
import { onMobile } from "../themes/responsive";
import { generateCoverImageUrl, findRenderedPathname, extractUuidFromPathname, convertHtmlToExcerpt, getTagPathname} from "../utils/path-utils";

// https://stackoverflow.com/a/17773849/4540808
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
// https://regexr.com/39rsv
const linkTagRegex = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/gm;

const addClassWhenLinkIsUrl = (html) => {
  const processedHtml = html.replace(linkTagRegex, (match, aTagProperties, aTagContent) => {
    if(urlRegex.test(aTagContent)){
      // console.log(`aTagContent (${aTagContent}): is a URL`)
      return `<a class="url" ${aTagProperties}>${aTagContent}</a>`;
    }

    // Do nothing
    return match;
  });
  return processedHtml;
}

export default function PostTemplate({ data, pageContext }) {
  const contentRef = useRef(null);
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  // Broken excerpt from GraphQL, use this way to get excerpt
  const postExcerpt = convertHtmlToExcerpt(postNode.html);
  const post = postNode.frontmatter;
  const postNodeHtml = addClassWhenLinkIsUrl(postNode.html);
  const { timeToRead } = data.markdownRemark;
  const { unsplashImgCoverId } = data.markdownRemark.frontmatter;
  const { date, isDraft, slug : fieldSlug, pageview, renderedPathname, shortPathname } = data.markdownRemark.fields;
  if (!post.id) {
    post.id = slug;
  }

  useEffect(()=> {
    /* eslint no-restricted-globals: off */
    if(!window || !history) return;
    const query = new URLSearchParams(window.location.search);
    if(query.has('action')){
      if(query.get('action') === globalConfig.actions.REDIRECT ){
        /**
         * If this come from 404 page, it will be duplicated history.
         * Solve with history.back();
         */
        if(history.length > 2){
          history.back();
        }
        /**
         * If this come from 404 page and access such URL directly,
         * find uuid of the post, and navigate to it.
         */
        else {
          const uuid = extractUuidFromPathname(window.location.pathname);
          const pathname = findRenderedPathname(uuid, data.allMarkdownRemark);
          navigate(pathname);
        }
      }
    }
  }, []);

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        {!isDraft && <SEO
          postPath={renderedPathname}
          shortUrl={shortPathname}
          postNode={postNode}
          postExcerpt={postExcerpt}
          postSEO
          coverPath={generateCoverImageUrl(fieldSlug)}
          postUnsplashImgCoverId={unsplashImgCoverId}
          /> }
        <Container>
          <h1 className="post-title">{post.title}</h1>

          <MetadataWrapper>
            <Wrapper>
              <div className='page-metadata page-metadata-first'>
                {format(parseISO(date), "MMM d, yyyy")}
              </div>
              <Flex>
                {timeToRead !== 0 && <div className='page-metadata'>{timeToRead} minutes to read</div>}
                <Person author={{
                  username: config.userGithub,
                  name: config.userName,
                  profileUrl: '/about',
                  avatarUrl: config.userAvatar
                }} />
              </Flex>
            </Wrapper>
            <RightWrapper>
              <span className="page-view">{numeral(pageview).format('0,0')} views</span>
              <span style={{ marginTop: '3px'}} >
                <ShareButton url={`${config.siteUrl}${shortPathname}`} />
              </span>
            </RightWrapper>

          </MetadataWrapper>
          <HorizontalDivider />

          {/* eslint-disable-next-line react/no-danger */}
          <PostContent ref={contentRef}
            dangerouslySetInnerHTML={{ __html: postNodeHtml }}
          />

          <div className="post-meta">
            <TagContainer>

              {post.tags &&
                post.tags.map((tag) => (
                  <Link
                    key={tag}
                    style={{ textDecoration: "none" }}
                    to={getTagPathname(tag)}
                  >
                    <Tag>#{tag}</Tag>
                  </Link>
                ))}
            </TagContainer>

            <SocialLinks postPath={`s/${slug}`} postNode={postNode} />          </div>
        </Container>
      </div>
    </Layout>
  );
}


/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        pageview
        renderedPathname
        shortPathname
      }
    }
    allMarkdownRemark: allMarkdownRemark {
      edges {
        node {
          fields {
            renderedPathname
            slug
          }
        }
      }
    }
  }
`;


const HorizontalDivider = styled.div`
  margin-bottom: 70px;
`;

const headingAnchorOffset = 100;

const PostContent = styled.div`

    body{
      ${onMobile} {
        font-size: 12pt;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0px;
      padding-top: ${headingAnchorOffset}px;
      margin-top: ${-headingAnchorOffset + 20}px;
    }

    a.anchor {
      top: ${headingAnchorOffset}px;
    }

    h1{
      font-size: 1.7rem;
    }
    h2{
        font-size: 1.5rem;
    }
    h3{
        font-size: 1.25rem;
    }
    h4{
        font-size: 1.15rem;
    }

    p {
        margin: 25px 0;
    }

    ol > li, ul > li{
      margin: 7px 0;
    }

    ol > li > p {
      margin: 10px 0;
    }

    p > code {
      margin-left: 2px;
      margin-right: 2px;
      font-size: 0.8em;
    }

    pre > code {
      font-size: 0.9rem;
    }

    /* Work with 'addClassWhenLinkIsUrl()' */
    a.url {
      word-break: break-all;
    }

    .gatsby-highlight{
      margin: 30px 0;
    }

    img{
      margin: 20px 0 20px 0;
      max-width: 100%;
      height: auto;
    }


    blockquote {
      background-color: var(--colors-blockquote);
      padding: 15px 25px;
      margin: 10px 0 10px 0;
      border-radius: 0.5em;
      margin-block-start: 0;
    }

    blockquote p {
      margin: 0;
      padding: 0;
    }

    iframe {
      border: none;
    }

    hr {
      margin: 70px 20px;
      border: 1px solid var(--colors-hover-0);
    }

    /** Styling collapsible markdown -> 'details > summary' */

    details {
      border: 2px solid var(--colors-hover-1);
      padding: 15px;
      border-radius: 7px;

      :hover{
        border-color: var(--colors-border-details);
      }

      > summary {
        text-decoration: underline;
        cursor: pointer;
        :hover{
          text-decoration: none;
        }
      }
    }

`;

const Flex= styled.span`
  display: flex;
  align-items:center;
`;

const RightWrapper= styled.span`
  display: flex;
  align-items:center;

  ${onMobile} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Wrapper = styled.span`
  display: flex;
  align-items:center;
  font-size: 1rem;

  ${onMobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MetadataWrapper = styled.span`
  display: flex;
  justify-content: space-between;

  .page-metadata, .page-view{
    font-size: 0.95rem;
  }
  .page-view{
    margin-right: 15px;
  }
`;

const Container = styled.div`
.post-title{
  font-family: var(--font-family-heading);
  font-size: 1.85rem;
  margin-bottom: 5px;

  ${breakpoint('tablet')`
    font-size: 2.2rem;
  `}
}

.page-metadata:after{
  padding-left: 6px;
  padding-right: 6px;
  content: "•";
}

.page-metadata-first:after {
  ${onMobile} {
    content: "";
  }
}
`;

const TagContainer = styled.div`
  margin-top: 35px;
  /* padding */
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  color: var(--colors-text-3);
  font-size: 1rem;
  margin-right: 30px;
`;

