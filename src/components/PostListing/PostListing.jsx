import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";

function PostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    const tags = [];
    if (postEdge.node.frontmatter.tags) {
      postEdge.node.frontmatter.tags.forEach((tag) => {
        tags.push(tag);
      });
    }

    postList.push({
      path:  postEdge.node.fields.renderedPathname,
      tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date?postEdge.node.fields.date: "2021-01-01",
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
    });
  });

  return (
    <div>
      {
        /* Your post list here. */
        postList.map((post) => (
          <PostItem  key={post.path}>
            <Link to={post.path} >
              {/* <a className="post-item-link"> */}
              <FlexContainer>
                <FlexItem width="150px">
                  <PostDate >
                    {format(parseISO(post.date), "yyyy MMM, d")}
                  </PostDate>
                </FlexItem>
                <FlexItem >
                  <h4>{post.title}</h4>
                  {/* <TagContainer>
                    {post.tags.map((tag) => (
                      <Tag>#{tag} </Tag>
                    ))}
                  </TagContainer> */}
                </FlexItem>
              </FlexContainer>
            </Link>
          </PostItem>
        ))
      }
    </div>
  );
}

const PostDate = styled.time`
  color: var(--colors-text-3);
  font-weight: 400;
  font-size: 1rem;
`;

const PostItem = styled.div`
  margin-bottom:10px;

  a, a:visited{
    display: inline-block;
    color: var(--text-heading);
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.5;
    text-decoration: none;
    width:100%;
    padding: 20px 15px 20px 15px;
    border-radius: 10px;
  }

  a:hover{
    background: var(--colors-hover-0);
  }

h4{
  margin:0;
  padding:0;
}
`;

const TagContainer = styled.div`
  margin-top: -5px;
  margin-bottom:20px;
`;

const Tag = styled.span`
  color: var(--colors-text-3);
  font-size: 0.8rem;
  margin-right: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${breakpoint('tablet')`
    flex-wrap: nowrap;
  `}
`;

const FlexItem = styled.div`
  min-width: 100%;

  ${breakpoint('tablet')`
    min-width: ${({ width }) => (width ? width : 0)};
  `}
`;

export default PostListing;
