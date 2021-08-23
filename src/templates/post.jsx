import React, {useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link, navigate } from "gatsby";
import _ from "lodash";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";
import "./prism-template.css";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import globalConfig from "../../data/globalConfig";
import Person from '../components/Person';
import Layout from "../layout/PageLayout";
import ShareButton from "../components/ShareButton";
import { onMobile } from "../themes/responsive";


export default function PostTemplate({ data, pageContext }) {
  const contentRef = useRef(null);
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const { timeToRead } = data.markdownRemark;
  const { date, isDraft, slug : fieldSlug } = data.markdownRemark.fields;
  if (!post.id) {
    post.id = slug;
  }

  // Not use this method, render the clean url instead
  // useEffect(()=> {
  //   if(!window) return;
  //   const query = new URLSearchParams(window.location.search);
  //   if(query.has('id')){
  //     if(query.get('id') !== readableSlug){
  //       window.location.search = `?id=${readableSlug}`;
  //     }
  //   } else {
  //     window.location.search = `?id=${readableSlug}`;
  //   }
  // }, []);

  useEffect(()=> {
    console.log(history.length)
    /* eslint no-restricted-globals: off */
    if(!window || !history) return;
    const query = new URLSearchParams(window.location.search);
    if(query.has('action')){
      if(query.get('action') === globalConfig.actions.REDIRECT ){
        // If this come from 404 page, it will be duplicated history.
        // Solve with history.back();
        if(history.length > 2){
          history.back();
        }
        else {
          navigate(window.location.pathname);
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
        {!isDraft && <SEO postPath={slug} postNode={postNode} postSEO coverPath={`${fieldSlug}/cover.jpg`} /> }
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
              <div style={{ marginTop: '10px'}} >
                <ShareButton url={`${config.siteUrl}/${fieldSlug}`} />
              </div>
              {/* <IconButton
                onClick={copyToClipboard} >
                <i className="fas fa-share-alt"></i>
              </IconButton> */}

          </MetadataWrapper>
          <HorizontalDivider />

          {/* eslint-disable-next-line react/no-danger */}
          <PostContent ref={contentRef}
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />

          <div className="post-meta">
            <TagContainer>

              {post.tags &&
                post.tags.map((tag) => (
                  <Link
                    key={tag}
                    style={{ textDecoration: "none" }}
                    to={`/tags/${_.kebabCase(tag)}`}
                  >
                    <Tag>#{tag}</Tag>
                  </Link>
                ))}
            </TagContainer>


            {/* <SocialLinks postPath={slug} postNode={postNode} /> */}
          </div>
          {/* <UserInfo config={config} /> */}
          {/* <Disqus postNode={postNode} /> */}
          {/* <Footer config={config} /> */}
          {/* <TableOfContents
            headings={mock}
            disableTOC={false}
            contentRef={contentRef}
          /> */}
        </Container>
      </div>
    </Layout>
  );
}

const HorizontalDivider = styled.div`
margin-bottom: 70px;
`;

const PostContent = styled.div`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      /* margin-bottom: 20px; */
      margin-top: 30px;
      margin-bottom: 0px;
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

    pre > code {
      font-size: 0.9rem;
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

    hr {
      margin: 70px 20px;
      border: 1px solid var(--colors-hover-0);
    }
    p code {
      word-break: break-all;
    }
`;

const Flex= styled.span`
  display: flex;
  align-items:center;
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
`;

const Container = styled.div`
.post-title{
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
  /* margin-top: -5px; */
  /* padding */
  a {
      word-break: break-all;
    }
`;

const Tag = styled.span`
  color: var(--colors-text-3);
  font-size: 1rem;
  margin-right: 30px;
`;


/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
  }
`;
