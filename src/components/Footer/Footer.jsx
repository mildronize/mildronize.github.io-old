import React from "react";
import { Link } from "gatsby";
import UserLinks from "../UserLinks/UserLinks";
// import "./Footer.css";
import styled from 'styled-components';
import "../../themes/font-awesome-all-5.2.0.css";

function Footer({ config }) {
  const url = config.siteRss;
  const { copyright } = config;
  if (!copyright) {
    return null;
  }
  return (

    <FooterContainer>

      <center>
        <div className="footer-copyright">© 2015 - 2022 thadaw.com </div>
        <div className="footer-info">
          <a href="https://github.com/mildronize/thadaw.com">V 5.0.0</a> Built with ❤️ by Thada Wangthammang
         </div>
         <UserLinks config={config} labeled />

      </center>

    </FooterContainer>

  );
}

export default Footer;

const FooterContainer = styled.div`
    margin-top: 8rem;
    margin-bottom: 4rem;
    font-size: 0.9rem;
`;
