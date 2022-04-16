---
title: Read Private key from .env file
uuid: zmpgpk8
date: '2021-08-28'
slug: read-private-key-from-env-file-zmpgpk8
draft: true
---

https://github.com/auth0/node-jsonwebtoken/issues/642#issuecomment-585173594

We fixed it by replacing `\n` in the env var with real line breaks

```js
process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n')
```

Hope this helps someone
