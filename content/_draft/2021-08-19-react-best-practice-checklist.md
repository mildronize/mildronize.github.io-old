---
layout: post
title: React Best Practices Checklist
tags:
  - react
  - pattern
  - Best Practices
language: th
uuid: bulndnf
---

# Performance Issue

## Avoid conditional rendering with Heavy Component

```jsx
function FirstExecuteComponent() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleWhenComponentMounted(')
  },[]);

  const handleWhenComponentMounted = async () => {
    await fetch('http://example.com/movies.json');
    setLoading(true);
  }

  return (
    <>
      {!loading && <HeavyComponent />}
    </>
  );
}
```

This may cause some problem in mobile or slow device.
It may take a long time to re-render `<HeavyComponent />` component.

# Debug Easier

## Avoid using empty div, use React.Fragment instead.

```jsx
<>
  {/* Your component*/}
</>
```

Note: `<>` is equivalent to `<React.Fragment>`

Because it will produce unnecessarily div html when render.