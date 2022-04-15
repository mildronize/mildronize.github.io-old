import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";
import { onSmallMobile, onMobile } from "../../themes/responsive";

function PostListingByYear({ postEdges }) {
  const postList = [];
  const yearSet = new Set();
  let yearGroup = [];
  postEdges.forEach((postEdge) => {
    const tags = [];
    if (postEdge.node.frontmatter.tags) {
      postEdge.node.frontmatter.tags.forEach((tag) => {
        tags.push(tag);
      });
    }

    const date  = postEdge.node.fields.date?postEdge.node.fields.date: "2021-01-01"

    postList.push({
      path:  postEdge.node.fields.renderedPathname,
      tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
    });

    yearSet.add(parseInt(format(parseISO(date), "yyyy")));

  });

  yearGroup = Array.from(yearSet).sort((a,b) => b - a);

  return (
    <div>
      {
        yearGroup.map(year => (
          <><Title>{year}</Title>
            <PostListing postList={postList} year={year}/>
          </>
        ))
      }
    </div>
  );
}

function PostListing({ postList, year }) {
  return (
    <div>
      {
        postList.map((post) => (
          parseInt(format(parseISO(post.date), "yyyy"))) === year &&
          <PostItem  key={post.path}>
            <Link to={post.path} >
              <FlexContainer>
                <FlexItem >
                  <PostTitle>{post.title}</PostTitle>
                </FlexItem>
                <FlexItem width="50px">
                  <PostDate >
                    {format(parseISO(post.date), "MM-dd")}
                  </PostDate>
                </FlexItem>
              </FlexContainer>
            </Link>
          </PostItem>
        )
      }
    </div>
  );
}
const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: var(--font-family-inter);
`;

// text overflow to ellipsis
const textOverflow = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const textNonOverflow = `
  overflow: auto;
  white-space: normal;
  text-overflow: none;
`

const PostTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 400;
  font-family: var(--font-family-default);
  transition: all ease-out 0.2s;

  ${textOverflow}

  ${onMobile}{
    ${textNonOverflow}
    margin-bottom: 20px;
  }


  :hover {
    ${textNonOverflow}
    color: var(--colors-brand);
    transform: scale(1.02);
    // font-size: 0.95rem;
  }
  margin: 5px 0 0 0;
  padding: 0;
`;


const PostDate = styled.time`
  color: var(--colors-text-3);
  font-weight: 400;
  font-size: 0.8rem;
`;

const PostItem = styled.div`
  margin-right:36px;
  margin-left: 36px;
  ${onMobile}{
    margin-left: 0px;
  }
  a, a:visited{
    margin-top: 0px;
    display: inline-block;
    color: var(--text-heading);
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.5;
    text-decoration: none;
    width:100%;
    border-radius: 10px;
  }

`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  jusify-content: space-between;
  flex-wrap: nowrap;
`;

const FlexItem = styled.div`
  padding-right: ${({ width }) => (width ? '0px' : '40px')};
  min-width: ${({ width }) => (width ? width : '100%')};
`;

export default PostListingByYear;
