import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

function Page404(props: PageProps) {

  useEffect(()=> {
    if(window) console.log(window.location);
  } ,[]);

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <h1>404</h1>
      </div>
    </Layout>
  );
}

export default Page404;
