import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';

function PostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
    });
  });

  return (
    <div>
      {
        /* Your post list here. */
        postList.map((post) => (
          <PostItem>
            <Link to={post.path} key={post.title}>
              <h4>{post.title}</h4>
            </Link>
          </PostItem>
        ))
      }
    </div>
  );
}

const PostItem = styled.div`
  a, a:visited{
    color: var(--text-heading);
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.5;
    text-decoration: none;
}
`;


export default PostListing;
