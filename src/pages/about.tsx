import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import styled from 'styled-components';
import Layout from "../layout/PageLayout";
import config from "../../data/SiteConfig";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import UserLinks from "../components/UserLinks/UserLinks";

const markdown = `
Hi, I'm Mild, Thada, Software Engineer & DevSecOps, Based in Hatyai, Thailand,  👨‍💻 Work Remotely

**Key Expertise**

- Azure (App Service, SQL Server)
- GitHub Action
- Terraform
- Time Series Database

**Technical Skills**

- Languages: \`TypeScript\`, \`Go Lang\`, \`C#\`,  \`Python\`
- DevOps Tools: GitHub Action, Terraform
- Platform/Framework: [ASP.NET](http://asp.NET) Core, Node.JS (TypeScript), React (TypeScript), Flutter, NestJS, NextJS
- Database: MongoDB, MySQL, OpenTSDB, Firebase & Firestore
- Tools: Docker, Memcached, Notion


`;

function AboutPage(props: PageProps) {

  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <h2>About Me</h2>
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        <Social>Getting to know me more: <UserLinks config={config} /></Social>

        <ReactMarkdown children={`or checkout [My Talks](/talk)`} remarkPlugins={[remarkGfm]} />
      </div>
    </Layout>
  );
}

export default AboutPage;

const Social = styled.p`
  margin-top: 60px;
  font-size: 1.1rem;
`;
