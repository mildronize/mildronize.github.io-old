import React, { useEffect } from "react";
import { PageProps, graphql, navigate } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import globalConfig from "../../data/globalConfig";
import { useState } from "react";
import { extractUuidFromPathname, findRenderedPathname } from "../utils/path-utils";

function Page404({ data }: PageProps) {

  const [isNotFound, setIsNotFound] = useState(false);

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
    return extractUuidFromPathname(window.location.pathname);
  }

  useEffect(() => {
    const uuid = handleInvalidUrl();
    const targetSlug = findRenderedPathname(uuid, (data as any).allMarkdownRemark);
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
            renderedPathname
            isDraft
          }
        }
      }
    }
  }
`

export default Page404;
