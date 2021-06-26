// https://github.com/Rocketseat/gatsby-themes/blob/7202b7529c2c2b8347ba28a7e56c442881067e91/@rocketseat/gatsby-theme-docs/src/components/Docs/TOC/index.js
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {useWindowScroll, useWindowSize} from 'react-use';
// import useWindowSize from 'react-use/lib/useWindowSize';
import styled from 'styled-components';

import slug from '../utils/slug';

export default function TableOfContents({ headings, disableTOC, contentRef }) {
  const { y } = useWindowScroll();
  const { width, height } = useWindowSize();
  const [offsets, setOffsets] = useState([]);

  const isMobile = width <= 1200;

  useEffect(() => {
    if (!isMobile || disableTOC) {
      const allHeadings = contentRef.current?.querySelectorAll(`h2, h3`);

      setOffsets(
        allHeadings &&
          Array.from(allHeadings)
            .map((heading) => {
              const anchor = heading.querySelector(`a`);
              if (!anchor) return {};

              return {
                id: heading.id,
                offset: heading.offsetTop + anchor.offsetTop,
              };
            })
            .filter(Boolean),
      );
    }
  }, [width, height, contentRef, isMobile, disableTOC]);

  const activeHeading = useMemo(() => {
    if (!isMobile || disableTOC) {
      const windowOffset = height / 2;
      const scrollTop = y + windowOffset;

      if (offsets) {
        for (let i = offsets.length - 1; i >= 0; i -= 1) {
          const { id, offset } = offsets[i];
          if (scrollTop >= offset) {
            return id;
          }
        }
      }
    }

    return null;
  }, [offsets, height, y, isMobile, disableTOC]);

  if (!disableTOC) {
    return (
      <Wrapper>
        <Container>
          <h2>On this page</h2>
          <nav>
            <ul>
              {headings
                .filter((heading) => heading.depth === 2 || heading.depth === 3)
                .map((heading) => {
                  const headingSlug = slug(heading.value);

                  return (
                    <li
                      key={heading.value}
                      style={{
                        marginLeft: heading.depth === 3 ? `8px` : null,
                      }}
                    >
                      <a
                        href={`#${headingSlug}`}
                        style={{
                          color:
                            activeHeading === headingSlug
                              ? "red"
                              : "black",
                        }}
                      >
                        {heading.value}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </Container>
      </Wrapper>
    );
  }

  return <Wrapper />;
}

TableOfContents.propTypes = {
  headings: PropTypes.array,
  disableTOC: PropTypes.bool.isRequired,
  contentRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

TableOfContents.defaultProps = {
  headings: null,
};

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  order: 2;

  padding-top: 72px;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-width: 200px;

  @media (max-width: 1200px) {
    position: relative;
    top: auto;
    order: 0;
    max-width: 100%;
    margin-left: 0;
    padding-top: 0;
  }
`;

export const Container = styled.div`
  h2 {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.142em;
    margin-top: 0rem;
    border: none;
    margin: 0 0 16px 0;
  }

  nav ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    li {
      margin-bottom: 12px;
      line-height: 1.1;

      a {
        font-size: 14px;
        font-weight: 400;
        text-decoration: none;
        transition: all 0.2s;
        overflow-wrap: break-word;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(120, 117, 122, 0.2);
  }
`;
