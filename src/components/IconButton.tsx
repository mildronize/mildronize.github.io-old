import styled from 'styled-components';

const IconButton = styled.a`
  /* margin-top: 7px; */
  font-weight: bold;
  padding: 10px;
  min-width: 45px;
  max-height: 45px;
  :hover{
    cursor: pointer;
  }
  i{
    color: var(--colors-text-3);
    font-size: 1.2em;
  }
  i:hover{
    color: var(--text-link);
  }
`;

export default IconButton;
