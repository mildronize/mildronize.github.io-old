import React, { useEffect } from "react";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import globalConfig from "../../data/globalConfig";
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
        // Remove this page from history, user can browse with short link.
        console.log(`Redirect to ${urlSlug}`);
        window.location.replace(`${urlSlug}?action=${globalConfig.actions.REDIRECT}`);
      } else {
        setIsNotFound(true);
      }
    }
  }


  const handleInvalidUrl = () => {
    if (!window) return '';
    const splits = window.location.pathname.replace(/^\//, '').split('/');
    let slugs;

    // is Draft Url
    if(/^\/draft\//.test(window.location.pathname)){
      slugs = splits[1].split('-');
    } else {
      slugs = splits[0].split('-');
    }
    const urlSlug = slugs[slugs.length - 1];
    return urlSlug;
  }

  useEffect(() => {
    const uuid = handleInvalidUrl();
    const targetSlug = getRenderedSlug(uuid);
    redirect(targetSlug);
  }, []);

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`Not Found | ${config.siteTitle}`} />

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
            isDraft
          }
        }
      }
    }
  }
`

export default Page404;
