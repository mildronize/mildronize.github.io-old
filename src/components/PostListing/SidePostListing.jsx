import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import numeral from 'numeral';
import { parseISO, format } from "date-fns";
import { getTagPathname } from "../../utils/path-utils";

function SidePostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    const tags = [];
    if (postEdge.node.frontmatter.tags) {
      postEdge.node.frontmatter.tags.forEach((tag) => {
        tags.push(tag);
      });
    }

    postList.push({
      path: postEdge.node.fields.renderedPathname,
      tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date
        ? postEdge.node.fields.date
        : "2021-01-01",
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      pageview: postEdge.node.fields.pageview,
    });
  });

  return (
    <Container>
      {
        postList.map((post) => (
          <PostItem key={post.path}>
              <FlexContainer>
                <FlexItem>
                  <Link className="post-link" to={post.path}>
                   <h4>{post.title}</h4>
                  </Link>
                </FlexItem>
                <FlexItem>
                  <PostMetadata>
                    <PostDate className="post-metadata">
                      {format(new Date(), "yyyy") === format(parseISO(post.date), "yyyy")
                        ? format(parseISO(post.date), "MMM, d")
                        : format(parseISO(post.date), "yyyy MMM, d")}
                    </PostDate>
                    {/* {post.tags.length > 0 && (
                      <Tag className="post-metadata">
                        <Link to={getTagPathname(post.tags[0])}>
                          {post.tags[0]}
                        </Link>
                      </Tag>
                    )} */}
                    <span>{numeral(post.pageview).format('0,0')} views</span>
                  </PostMetadata>
                </FlexItem>
              </FlexContainer>
          </PostItem>
        ))
      }
    </Container>
  );
}

const Container = styled.div`
  .post-metadata:after{
    padding-left: 10px;
    padding-right: 10px;
    content: "·";
  }

  a, a:visited{
    color: var(--text-heading);
    text-decoration: none;
  }
`;

const PostMetadata = styled.span`
  font-size: 0.8rem;
  color: var(--colors-text-3);

  a, a:visited {
    font-size: 0.8rem;
    color: var(--colors-text-3);
  }
`;

const PostDate = styled.time`
  font-weight: 400;
  padding-top: 5px;
`;

const PostItem = styled.div`
  margin-bottom: 30px;

  .post-link{
    a, a:visited {
      display: inline-block;
      font-weight: 400;
      font-size: 0.8rem;
      line-height: 1.5;
      width: 100%;
      padding: 20px 15px 10px 0px;
      border-radius: 10px;
    }
  }

  h4 {
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`;

const TagContainer = styled.div`
  margin-top: -5px;
  margin-bottom: 20px;
`;


const Tag = styled.span`
  a, a:visited {
    padding: 5px;
  }

  margin-right: 15px;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  min-width: 100%;
`;

export default SidePostListing;
