---
title: >-
  3 เรื่อง ที่ควรทำหลังติดตั้ง WSL บน Windows เพื่อทำให้การใช้งานร่วมกับ VS Code
  สะดวกมากขึ้น
tags:
  - WSL
  - VS Code
  - Windows
uuid: h3kmk3n
unsplashImgCoverId: 4RK4-jjAdr0
---

**WSL (Windows Subsystem for Linux)** เป็นการรัน Linux บน Windows โดยที่เราสามารถใช้งาน Linux ได้จนไม่รู้สึกว่า Linux รันบน Virtual machine นี่คือความ Amazing อย่างหนึ่งของ WSL

จุดเด่นของ WSL ที่ทำงานได้เสมือนเป็นเครื่อง Host จริงๆ เลยก็คือ Visual Studio Code ที่มี Built-in Plugin หลายๆ ตัว เช่น VS Code Server ที่จะติดตั้งบน Linux Guest อัตโนมัติเพื่อให้การทำงาน Smooth ขึ้น โดยไม่ต้อง setup เรื่อง SSH

อีกทั้งยังมี Remote Development via SSH ที่สามารถเปิด Folder จากใน Container หรือจาก virtual machine และ WSL อีกด้วย

> ณ วันที่เขียนบทความนี้เป็น version ที่ 2 ถือว่าพัฒนาได้ดีขึ้นกว่า version 1 มากๆ สามารถใช้ใช้ linux command ได้หลากหลาย รวมถึง performance ที่ทำให้เร็วขึ้นด้วย เรียกได้ว่าแทบไม่ต้องติดตั้ง Linux บน virtual machine แต่ใช้งาน WSL ได้สะดวกมากๆ

วันนี้มาเสนอ 3 เรื่องที่ทำแล้ว ทำให้การทำงาน VS Code บน Windows ร่วมกับ WSL ราบรื่นมากขึ้น

# 1. ใส่ Alias เพื่อรัน VS Code จาก WSL ได้

แน่นอน ถ้าเราติดตั้ง VS Code บน Windows เราสามารถใช้คำสั่ง `code` เพื่อเรียก VS Code จาก terminal ได้ทันทีเลย

หรือเราสามารถใช้ `code ./path/to/folder` เพื่อเปิด VS Code พร้อมกับ Folder นั้นได้เลย หรือถ้าเปิด terminal ผ่าน VS Code เราสามารถใช้ `code -r ./path/to/folder` เพื่อเปิด folder แทนที่ folder ที่กำลังเปิดอยู่กับ VS Code

**แต่...**

เราไม่สามารถเรียก `code` ผ่าน WSL ได้ เพราะ code ไม่ได้อยู่ใน environment variable ของ Linux เพราะว่า เวลาเราเปิด WSL Terimal ขึ้นมา มันเป็นการ SSH ไปหา WSL (Linux Virtual machine Guest)

ดังนั้นผมจึงแนะนำให้ตั้งค่า alias ไว้ที่ WSL

![Demo: setup alias code for WSL on Windows]()

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
