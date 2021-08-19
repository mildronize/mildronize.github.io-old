import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

function AboutPage(props: PageProps) {

  useEffect(()=> {
    if(window) window.location.href = 'https://bit.ly/mildthada-notion-cv-v3'
  } ,[]);

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
      </div>
    </Layout>
  );
}

export default AboutPage;
