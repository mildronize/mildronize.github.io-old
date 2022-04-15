import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { parseISO, format } from "date-fns";
import { getUnsplashImageURL, getTagPathname } from "../../utils/path-utils";
import { onSmallMobile, onMobile, onTablet } from "../../themes/responsive";
// import Tag from "../Tag";

function CoverPostListing({ postEdges }) {
  const postList = [];
  postEdges.forEach((postEdge) => {
    let tags = [];
    if (postEdge.node.frontmatter.tags) {
      postEdge.node.frontmatter.tags.forEach((tag) => {
        tags.push(tag);
      });
    }
    const maxLength = tags.length > 3? 3: tags.length;
    tags = tags.splice(0, maxLength);


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
    <Container>
      {
        /* Your post list here. */
        postList.map((post) => (
          <PostItem  key={post.path}>
              <FlexContainer>
                <FlexItem cover>
                  <Link className="post-link" to={post.path} >
                    <img src={getUnsplashImageURL(post.unsplashImgCoverId, 230, 140)} />
                  </Link>
                </FlexItem>
                <FlexItem >
                  <Link className="post-link" to={post.path} >
                    <Title>{post.title}</Title>
                    <Excerpt>{post.excerpt}</Excerpt>
                  </Link>
                  <PostDate className="post-metadata" >
                    {format(new Date(), "yyyy") === format(parseISO(post.date), "yyyy")
                      ? format(parseISO(post.date), "MMM, d")
                      : format(parseISO(post.date), "yyyy MMM, d")}
                  </PostDate>
                  <TagContainer>
                    {post.tags.map((tag) => (
                      <Tag><Link to={getTagPathname(tag)}>{tag}</Link></Tag>
                    ))}
                  </TagContainer>
                </FlexItem>
              </FlexContainer>

          </PostItem>
        ))
      }

    <MorePostLink >
      <Link to="/blog/" ><h4>More posts...</h4></Link>
    </MorePostLink>
    </Container>
  );
}

const Title = styled.h4`
  font-family: var(--font-family-heading);
`;

const Container = styled.div`
  .post-metadata:after{
    padding-left: 10px;
    padding-right: 10px;
    content: "•";
  }

  a, a:visited{
    color: var(--text-heading);
    text-decoration: none;
  }
`;

const MorePostLink = styled.div`
  text-align: center;
  margin-top: 45px;
  a {
    padding: 10px;
  }
`;

const PostItem = styled.div`
  margin-bottom: 25px;

  .post-link {
    a, a:visited {
      display: inline-block;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 1.5;
      width:100%;
      padding: 20px 15px 0px 0px;
      border-radius: 10px;
      ${onSmallMobile}{
        padding-right: 0px;
      }
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

const TagContainer = styled.span`
  /* margin-top: -5px;
  margin-bottom:20px; */
`;

const Tag = styled.span`
  a, a:visited {
    color: var(--colors-text-3);
  }

  font-size: 0.8rem;
  margin-right: 15px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${onSmallMobile}{
    flex-wrap: wrap;
  }
`;

const FlexItem = styled.div`
  width: ${({ cover }) => cover? '230px': '100%'};
  margin-right: ${({ cover }) => cover? '30px': '0'};

  ${onTablet} {
    width: ${({ cover }) => cover? '150px': '100%'};;
  }

  img{
    width: 230px;
    padding: 5px;

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
    margin-right:0;
  }
`;
// console.log(onSmallMobile)
export default CoverPostListing;
