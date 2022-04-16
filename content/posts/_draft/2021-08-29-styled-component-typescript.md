---
title: styled component TypeScript
uuid: w5y3zzn
date: '2021-08-29'
slug: styled-component-type-script-w5y3zzn
draft: true
---

```ts
interface IContainerProps {
  wide: boolean;
}

const Container = styled.div`
  max-width: ${(props: IContainerProps) => props.wide? 1300 :700 }px;
  margin: 0 auto;
`;
```

Ref: https://github.com/styled-components/styled-components/issues/630#issuecomment-290569741
