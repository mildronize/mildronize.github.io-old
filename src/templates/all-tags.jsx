import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout/PageLayout";
import config from "../../data/SiteConfig";

export default function Tag({ pageContext }) {
  const { sortedTags } = pageContext;
  console.log(sortedTags);
  return (
    <Layout>
      <div className="tag-container">
        <Helmet title={`Posts tagged as  | ${config.siteTitle}`} />
        <h2>All Tags</h2>
        {sortedTags.map(tag => (
          <p key={tag.slug}><a href={tag.path}>{tag.displayName}: {tag.count}</a></p>
        ))}
      </div>
    </Layout>
  );
}
