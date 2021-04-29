import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/PageLayout";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
// import "./post.css";
import styled from 'styled-components';
import { parseISO, format } from "date-fns";

import _ from "lodash";
import { Link } from "gatsby";

export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
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
        <div>
          <h1>{post.title}</h1>
          <div >
            {format(parseISO(post.date), "MMM d, yyyy")}
          </div>
          <HorizontalDivider />
          {/* eslint-disable-next-line react/no-danger */}
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />

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


            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          {/* <Disqus postNode={postNode} /> */}
          <Footer config={config} />
        </div>
      </div>
    </Layout>
  );
}

const HorizontalDivider = styled.div`
margin-bottom: 100px;
`;

const PostContent = styled.div`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 40px;
    }

    p {
        margin-bottom: 50px;
    }

    li p{
      margin-bottom: 10px;
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
