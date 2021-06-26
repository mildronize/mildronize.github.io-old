import React, {useRef} from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
// import TableOfContents from "../components/TableOfContents";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
// import "./dracula.css";
import "./prism-template.css";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";

import _ from "lodash";
import { Link } from "gatsby";

// const mock = [
//   {
//     "url": "#first-h2",
//     "title": "First h2",
//     "items": [
//       {
//         "url": "#first-h3-under-first-h2",
//         "title": "First h3 under first h2",
//         "items": [
//           {
//             "url": "#first-h4-under-first-h3",
//             "title": "First h4 under first h3"
//           }
//         ]
//       },
//       {
//         "url": "#second-h3-under-first-h2",
//         "title": "Second h3 under first h2"
//       }
//     ]
//   },
//   {
//     "url": "#second-h2",
//     "title": "Second h2",
//     "items": [
//       {
//         "url": "#first-h3-under-second-h2",
//         "title": "First h3 under second h2"
//       }
//     ]
//   }
// ];

export default function PostTemplate({ data, pageContext }) {
  const contentRef = useRef(null);
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const date = data.markdownRemark.fields.date;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Container>
          <h1 className="post-title">{post.title}</h1>
          <div >
            {format(parseISO(date), "MMM d, yyyy")}
          </div>
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
      padding: 10px 25px;
      margin: 10px 0 10px 0;
      border-radius: 0.3em;
      margin-block-start: 0;
    } 


`;

const Container = styled.div`
 .post-title{
  font-size: 2rem;
  
  ${breakpoint('tablet')`
    font-size: 2.5rem;
  `}
}
`;

const TagContainer = styled.div`
  /* margin-top: -5px; */
  /* padding */
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
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
