---
title: >-
  3 เรื่อง ที่ควรทำหลังติดตั้ง WSL บน Windows เพื่อทำให้การใช้งานร่วมกับ VS Code
  สะดวกมากขึ้น
tags:
  - WSL
  - VS Code
  - Windows
uuid: h3kmk3n
---

# 1. ใส่ Alias เพื่อรัน VS Code จาก WSL ได้

```powershell
Get-Command code
```

```bash
# Open VS code from WSL
alias code='/mnt/c/Users/mildronize/AppData/Local/Programs/Microsoft\ VS\ Code/bin/code'
```

# 2. Sharing the same `ssh-agent` among multiple login sessions

Ref: https://superuser.com/questions/141044/sharing-the-same-ssh-agent-among-multiple-login-sessions

อ่านเพิ่มเติม [วิธีการตั้งค่า SSH สำหรับ GitHub เพื่อให้จำรหัสผ่านบน Windows, WSL, MacOS และ Ubuntu](/วิธีการตั้งค่า-ssh-สำหรับ-git-hub-เพื่อให้จำรหัสผ่านบน-windows-wsl-mac-os-และ-ubuntu-hzpnrnx/)

# 3. ติดตั้ง dotfiles

ตัวอย่างของผม: https://github.com/mildronize/dotfiles
