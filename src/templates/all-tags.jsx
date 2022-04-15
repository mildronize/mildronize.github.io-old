import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout/PageLayout";
import config from "../../data/SiteConfig";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";

export default function AllTag({ pageContext }) {
  const { sortedTags } = pageContext;
  return (
    <Layout>
      <div>
        <Helmet title={`Posts tagged as  | ${config.siteTitle}`} />
        <PageTitle>All Tags</PageTitle>
        {sortedTags.map(tag => (
          <Tag key={tag.slug}><a className="zoom" href={tag.path}>{tag.displayName} <sup>{tag.count}</sup></a></Tag>
        ))}
      </div>
    </Layout>
  );
}

const Tag = styled.span`
  sup {
    color: var(--colors-text-3);

  }
  a {
    color: var(--color-default);
    font-size: 1.2rem;
    padding: 5px 15px;
    font-weight: 400;
    display: inline-block;
  }
  .zoom {
    transition: all ease-out 0.2s;
  }
  .zoom:hover {
    position: relative;
    color: var(--colors-brand);
    transform: scale(1.2);
    font-weight: 500;
    background: var(--colors-text-4);
    border-radius: 10px;
    z-index: 10;
  }


`;
