import React from "react";
import styled from 'styled-components';
import "./UserLinks.css";
import "../../themes/font-awesome-all-5.2.0.css";

function UserLinks({ config, small }) {
  console.log(`${small} small`)
  function getLinkElements() {
    const { userLinks } = config;

    return userLinks.map((link) => (
      <SocialLink href={link.url} key={link.label} aria-label={link.label}>
        {/* <button type="button">{labeled ? link.label : ""}</button> */}
        <i className={link.iconClassName}></i>
      </SocialLink>
    ));
  }

  const { userLinks } = config;
  if (!userLinks) {
    return null;
  }
  return <Container small={small}>{getLinkElements()}</Container>;
}

export default UserLinks;

const Container = styled.div`
  font-size: ${props => props.small ? `1`: `1.4`}rem;
  a, a:visited{
    color: var(--colors-text-3);
  }
  a:hover{
    color: var(--colors-text-0);
  }
`;

const SocialLink = styled.a`
  margin: 0 7px;
`;
