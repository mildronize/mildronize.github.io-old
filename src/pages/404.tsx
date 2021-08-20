import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { graphql } from 'gatsby';
import { useState } from "react";

function Page404({ data }: PageProps) {

  const [isNotFound, setIsNotFound] = useState(false);

  const getRenderedSlug = (urlSlug: string) => {
    const postEdge = data as any;
    const foundNodes = postEdge.allMarkdownRemark.edges.filter(edge => urlSlug === edge.node.fields.slug);
    if (foundNodes.length > 0)
      return foundNodes[0].node.fields.renderedSlug;
    return '';
  }

  const redirect = (urlSlug: string) => {
    if (window) {
      if (urlSlug !== '') {
        window.location.pathname = urlSlug;
      } else {
        setIsNotFound(true);
      }
    }
  }

  const handleInvalidUrl = () => {
    if (window) {
      const splits = window.location.pathname.replace(/^\//, '').split('/');
      const slugs = splits[0].split('-');
      const urlSlug = slugs[slugs.length - 1];
      return urlSlug;
    }
    return '';
  }

  useEffect(() => {
    const uuid = handleInvalidUrl();
    const targetSlug = getRenderedSlug(uuid);
    redirect(targetSlug);
  }, []);

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />

        {isNotFound &&
          <div style={{ textAlign: 'center' }}>
            <meta http-equiv="refresh" content="2;URL='/'" />
            <h1>404</h1>
            <h1>PAGE NOT FOUND</h1>
            <p>We're redirecting to homepage instead.</p>
          </div>
        }

      </div>
    </Layout>
  );
}


export const query = graphql`
   {
    allMarkdownRemark {
      edges {
        node {
          fields {
            filename
            slug
            readableSlug
            renderedSlug
          }
        }
      }
    }
  }
`

export default Page404;
