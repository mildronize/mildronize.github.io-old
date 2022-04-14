import React, { useEffect } from "react";
import { PageProps } from "gatsby";
import styled from 'styled-components';
import { Helmet } from "react-helmet";
import Layout from "../layout/PageLayout";
import config from "../../data/SiteConfig";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `

### Upcoming
- May 7, 2022 - ***Dealing with more than 100 secrets on GitHub Actions using Mozilla SOPS and Azure Key Vault*** -- The problem we're facing with more than 100 secrets in our environment and how to we utilize implementation method and still provide acceptable security level. Lesson learn about how we manage secrets using Mozilla SOPS and Azure Key Vault on GitHub Actions deployment pipeline.
  - Event: Global Azure Thailand.

- May 12, 2022 - ***Create your own naming convention of resources with Terraform Module*** -- Cloud resource name is one of the most troublesome tasks. When it is created, it is hard to rename. Bad naming can cause such a chaotic management. Using other convention might not be compatible with your organization. Let’s define your own naming convention.
  - Event: Cloud Native Night bangkok

### 2022

- Apr 7, 2022 - ***Deploy .NET Core 6 to Multiple Azure App Services using GitHub Actions Matrix*** -- Demonstrate how to organize deployment pipeline to multiple Azure App Services and GitHub Secrets in maintainable way.
  - @ Cloud Native Night: GitOps Experience on Azure
  - Hosted by Microsoft Thailand, KubeOps Skills
  - [Slide](https://docs.google.com/presentation/d/1ctnqJfWxpH-s5l7zkvN9tiXReuxeLajauWfsQ9CkGmU/edit?usp=sharing), [GitHub Repo in Demo](https://github.com/mildronize/deploy-multiple-azure-app-services-using-github-actions-matrix)
  - [Meetup](https://www.meetup.com/cloud-native-bangkok-meetup-group/events/284972789/), [Facebook Event](https://www.facebook.com/events/549929293012414/), [Promoted Cover Image](/files/talks/2022-04-07.jpeg)

- Mar 24, 2022 - ***Test-Driven Development Training*** in T.T. Software Solution
  - [GitHub Repo](https://github.com/dotnetthailand/kata-workshop)

### 2018
- Sep 27, 2018 - ***“A Software Cache Mechanism for Reducing the OpenTSDB Query Time,”*** in proceeding of The 18th International Symposium on Communications and Information Technologies (ISCIT 2018)
  - @Sukosol Hotel, Bangkok, Thailand
  - Authors: Thada Wangthammang and Pichaya Tandayya
  - [Publication @ IEEE Xplore](https://ieeexplore.ieee.org/document/8587857)
  - [Download Publication in PDF](/files/publications/2018%20-%20A%20Software%20Cache%20Mechanism%20for%20Reducing%20the%20OpenTSDB%20Query%20Time.pdf)

- May 8, 2018 - ***“Registration Assistant Application using Local Search and Tabu List Technique”*** Thaksin University Journal Special Edition for 28th National Conference of Thaksin University, 2018.
  - Authors: Thada Wangthammang, Seksun Suwanmanee, Touchai Angchuan, and Sangsuree Vasupongayya
  - [Download Publication in PDF (Thai)](/files/publications/2018%20-%20Registration%20Assistant%20Application%20using%20Local%20Search%20and%20Tabu%20List%20Technique.pdf)

### 2015
- Oct 24, 2015: ***Let's Make a Blog in Developer Way***
  - @Tuber, Songkhla, Thailand
  - [Slides](https://github.com/mildronize/slides/tree/master/slides/barcampsk4-blog-dev-with-github-page)
`

function TalkPage(props: PageProps) {

  return (
    <Layout>
    <div className="landing-container">
      <div className="posts-container">
      <Helmet title={`Talk | ${config.siteTitle}`} />
        <Header>My Talk</Header>
        <Content>
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </Content>
      </div>
    </div>
  </Layout>
  );
}

export default TalkPage;

const Header = styled.h4`
  font-family: var(--font-family-inter);
  font-weight: bold;
  font-size: 1.4rem;
`;

const Content = styled.div`
  font-size: 1rem;

  li > p {
    margin-bottom:3px;
  }
`;
