import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { graphql } from 'gatsby';
import { useState } from "react";

function Page404({ data }: PageProps) {

  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (window) {
      const splits = window.location.pathname.replace(/^\//, '').split('/');
      const URLslug = '/' + splits[0];
      const postEdge = data as any;
      const foundNodes = postEdge.allMarkdownRemark.edges.filter( edge => URLslug === edge.node.fields.slug );
      if(foundNodes.length > 0){
        window.location.pathname = foundNodes[0].node.fields.renderedSlug;
      } else {
        setIsNotFound(true);
      }

    }
  }, []);

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />

        {isNotFound &&
          <div style={{textAlign:'center'}}>
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
