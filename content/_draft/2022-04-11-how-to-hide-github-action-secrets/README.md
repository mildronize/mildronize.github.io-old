---
title: How to hide github action secrets
uuid: kauwjer
---

Thank you for mention about this issue. I'm stuck with same problem and thank you all for your answers.

I just want to read some secret from encrypted files (like SOPS)  and hide it.

Here is my solution,

```yml
steps:
  - uses: actions/checkout@v2
  - name: Mask Password
    id: mark_password
    run: |
      secret=`cat "README.md"`
      echo "::add-mask::$secret"
      echo "::set-output name=password::$secret"
  - run: echo "${{ steps.mark_password.outputs.password }}"
```

Here is result:

![image](https://user-images.githubusercontent.com/3647850/162421501-1e867651-71b7-4c1c-ac99-e4373a997ffb.png)

I think at the time in the step that we setting `add-mask`, somehow we should don't show the actual value on the console.

I hope this might be help.


Ref: https://github.com/actions/runner/issues/475#issuecomment-1092734499
