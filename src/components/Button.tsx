import styled from 'styled-components';

const LinkButton = styled.a`
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  :hover{
    background: var(--colors-hover-0);
    cursor: pointer;
  }
  i{
    color: var(--color-default);
    font-size: 1.2em;
  }
`;

export default LinkButton;
