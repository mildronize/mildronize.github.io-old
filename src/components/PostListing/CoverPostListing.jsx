import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";
import { getUnsplashImageURL, convertHtmlToExcerpt } from "../../utils/path-utils";
import { onSmallMobile, onMobile, onTablet } from "../../themes/responsive";

function CoverPostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    const tags = [];
    if (postEdge.node.frontmatter.tags) {
      postEdge.node.frontmatter.tags.forEach((tag) => {
        tags.push(tag);
      });
    }


    console.log(postEdge.node.frontmatter)
    postList.push({
      path:  postEdge.node.fields.renderedPathname,
      tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date?postEdge.node.fields.date: "2021-01-01",
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      unsplashImgCoverId: postEdge.node.frontmatter.unsplashImgCoverId,
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
                <FlexItem cover>
                  <img src={getUnsplashImageURL(post.unsplashImgCoverId, 250, 160)} />
                </FlexItem>
                <FlexItem >
                  <h4>{post.title}</h4>
                  <Excerpt>{post.excerpt}</Excerpt>
                  <PostDate >
                    {format(parseISO(post.date), "yyyy MMM, d")}
                  </PostDate>
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
    padding: 20px 15px 20px 0px;
    border-radius: 10px;
    ${onSmallMobile}{
      padding-right: 0px;
    }
  }

  a:hover{
    /* background: var(--colors-hover-0); */
  }

h4{
  margin:0;
  padding:0;
}
`;

const Excerpt = styled.div`
  color: var(--colors-text-3);
  font-weight: 400;
  font-size: 0.9rem;
`;

const PostDate = styled.time`
  color: var(--colors-text-3);
  font-weight: 400;
  font-size: 0.8rem;
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
  flex-wrap: nowrap;

  ${onSmallMobile}{
    flex-wrap: wrap;
  }
`;

const FlexItem = styled.div`
  width: ${({ cover }) => cover? '250px': '100%'};
  margin-right: ${({ cover }) => cover? '20px': '0'};

  ${onTablet} {
    width: ${({ cover }) => cover? '150px': '100%'};;
  }

  img{
    width: 250px;

    ${onTablet} {
      width: 150px;
    }

    ${onMobile} {
      width: 150px;
    }

    ${onSmallMobile} {
      width: 100%;
      margin-right:0;
    }
  }

  ${onSmallMobile} {
    width: 100%;
  }
`;
// console.log(onSmallMobile)
export default CoverPostListing;
