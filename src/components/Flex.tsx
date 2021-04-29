// https://github.com/outline/outline/blob/6de793e94e01b8ed1bcd896f24e93357b85dff59/app/components/Flex.js
import * as React from "react";
import styled from "styled-components";

type JustifyValues =
  | "center"
  | "space-around"
  | "space-between"
  | "flex-start"
  | "flex-end";

type AlignValues =
  | "stretch"
  | "center"
  | "baseline"
  | "flex-start"
  | "flex-end";

interface PropsType {
  column?: boolean,
  shrink?: boolean,
  align?: AlignValues,
  justify?: JustifyValues,
  auto?: boolean,
  className?: string,
  children?: React.ReactNode,
  role?: string,
  width?: number;
  container?: boolean;
};

const Flex = (props: PropsType) => {
  const { children, ...restProps } = props;

  return (
    <Container {...restProps}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ 
    column?: boolean,
    shrink?: boolean,
    align?: AlignValues,
    justify?: JustifyValues,
    auto?: boolean,
    className?: string,
    children?: React.ReactNode,
    role?: string, 
    width?: number,
    container?: boolean;
}>`
  display: ${({ container }) => (container ? "flex" : "inline-block")};
  flex: ${({ auto }) => (auto ? "1 1 auto" : "initial")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-shrink: ${({ shrink }) => (shrink ? 1 : "initial")};
  min-height: 0;
  min-width: ${({ width }) => (width ? width : 0)};
`;

export default Flex;