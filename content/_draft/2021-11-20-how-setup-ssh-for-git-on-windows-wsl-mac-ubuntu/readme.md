---
title: >-
  วิธีการตั้งค่า SSH สำหรับ GitHub เพื่อให้จำรหัสผ่านบน Windows, WSL, MacOS และ
  Ubuntu
tags:
  - GitHub
  - SSH
  - windows
  - macos
  - ubuntu
uuid: hzpnrnx
---

ถ้าใครจะตั้งค่า SSH สำหรับ Remote Server อื่นๆ ก็ใช้หลักการเดียวกันได้ เพียงแต่ในบทความนี้ยกตัวอย่าง GitHub

บทความนี้จะแบ่งจะเป็น 2 ส่วนใหญ่ๆ คือฝั่ง Unix-based (Mac OS, Ubuntu, WSL) และฝั่ง Windows ครับ ก่อนจะเข้าเรื่อง ผมขออธิบายหลักการของ SSH เบื้องต้นนะครับ การเชื่อมต่อผ่าน SSH หรือ Secure Shell นั้น คือการเชื่อมต่อไปเครื่องต้นทาง (Local) ไปยังเครื่องปลายทาง (Remote) ผ่านการเข้ารหัส ซึ่งมั่นใจได้ว่าการเชื่อมต่อนั้นปลอดภัยในระดับที่ยอมรับได้ในระดับสากล

ในการเชื่อมต่อนั้นจะเป็นแบบ Asymmetric Encryption หรือ การเข้ารหัสแบบไม่สมมาตร
โดยก่อนจะมีการส่งข้อมูลจะมีการสร้างคู่ของกุญแจ ที่ก็ต้องใช้ร่วมกันเท่านั้น เราจะเรียกว่า Public key และ Private key ซึ่งวิธีเข้ารหัสที่ได้รับนิยมคือ RSA

- Public key คือ กุญแจสาธารณะ ซึ่งคือสามารถเผยแพร่ให้ เครื่องปลายทางได้
- Private key คือ กุญแจส่วนตัว ซึ่งไม่ควรเผยแพร่ และเจ้าของข้อมูลควรจะถือไว้เท่านั้น

โดยก่อนที่จะมีการส่งข้อมูลจะมีการเข้ารหัสด้วย Public Key ทุกครั้ง และเมื่อข้อมูลถูกส่งมายั่งเครื่องต้นทางที่มี Private key แล้วก็จะสามารถถอดรหัสเพื่อเห็นข้อมูลจริงๆ ได้

![](Asymmetric-Encryption.jpg)

# Mac OS, Ubuntu, WSL

สร้าง SSH key

```bash
$ ssh-keygen -t rsa -C "your_email@example.com"
```

Copy ข้อมูลในไฟล์ `~/.ssh/id_rsa.pub` (ซึ่งก็คือ Public Key) ไปวางที่ GitHub account settings (https://github.com/settings/keys).

ลองทดสอบ SSH key:

```bash
$ ssh -T git@github.com
Hi [Your Username]! You've successfully authenticated, but GitHub does not provide shell access.
```

ไปยังโฟลเดอร์ที่ของ Git Repo ในเครื่องเราแล้วเปลี่ยน Git remote ให้เป็นแบบ SSH

```bash
$ git remote set-url origin git@github.com:username/your-repository.git
```

จากนั้นลอง commit และ push ดู ระบบไม่ควรถามหารหัสผ่านแล้ว

Ref: https://gist.github.com/developius/c81f021eb5c5916013dc


# Windows 10, 11

เมื่อปี 2018 ผมได้เขียนบทความ [วิธีตั้งค่าการใช้งาน Github (แบบไม่ต้องกรอกรหัสผ่านทุกครั้ง) ผ่าน SSH บน Windows](/s/mo4feik/) ซึ่งได้แนะนำวิธีการใช้ Putty สำหรับทำงานเป็นเบื้องหลัง แต่เราจำเป็นต้องเปิดตัว agent ขึ้นมาทุกครั้ง หรือถ้าไม่อย่างนั้นก็ต้อง ตั้งค่า startup เอง

เมื่อปี 2019 Windows ได้ปล่อยความสามารถอย่างหนึ่งคือ OpenSSH Client ที่เป็น service อยู่บน Windows ซึ่งดีมากๆ เลย ที่เราไม่ต้องพึ่งโปรแกรมอื่นๆ อย่างเช่น Putty

ในหัวข้อนี้จะเน้นที่ Powershell เท่านั้นนะครับ ถ้าใครใช้ WSL หรือ Git Bash บน Windows แล้วแนะนำให้ใช้หัวข้อข้างบนแทน

## Make sure enable OpenSSH on Windows 10

OpenSSH is available as part of Windows 10 which makes using SSH from cmd/powershell much easier in my opinion. It also doesn't rely on having git installed, unlike my previous solution.

1. Open Manage optional features from the start menu and make sure you have `OpenSSH Client` in the list. If not, you should be able to add it.

2. Open Services from the start Menu

3. Scroll down to `OpenSSH Authentication Agent` > right click > properties

4. Change the Startup type from Disabled to any of the other 3 options. I have mine set to Automatic (Delayed Start)

5. Open cmd and type where ssh to confirm that the top listed path is in System32. Mine is installed at `C:\Windows\System32\OpenSSH\ssh.exe.` If it's not in the list you may need to close and reopen cmd.
6. **Optional step/troubleshooting:** If you use git, you should set the `GIT_SSH` environment variable to the output of where ssh which you ran before (e.g `C:\Windows\System32\OpenSSH\ssh.exe`). This is to stop inconsistencies between the version of ssh you're using (and your keys are added/generated with) and the version that git uses internally. This should prevent issues that are similar to this

Some nice things about this solution:

- You won't need to start the ssh-agent every time you restart your computer
- Identities that you've added (using ssh-add) will get automatically added after restarts. (It works for me, but you might possibly need a config file in your c:\Users\User\.ssh folder)
- You don't need git!
- You can register any rsa private key to the agent. The other solution will only pick up a key named id_rsa

## How to Setup (Powershell)

Create a new repository, or reuse an existing one.

Generate a new SSH key:
```
ssh-keygen -t rsa -C "your_email@example.com" -f $env:UserProfile/.ssh/id_rsa
```

Copy the contents of the file `~/.ssh/id_rsa.pub` to your SSH keys in your GitHub account settings (https://github.com/settings/keys).

Test SSH key:
```
PS > ssh -i ~/.ssh/id_rsa -T git@github.com
Hi mildronize! You've successfully authenticated, but GitHub does not provide shell access.
```

Change directory into the local clone of your repository (if you're not already there) and run:

```
PS > git remote set-url origin git@github.com:username/your-repository.git
```

Now try editing a file (try the README) and then do:

```
PS > git commit -am "Update README.md"
PS > git push
```

You should not be asked for a username or password. If it works, your SSH key is correctly configured.

## How to make Powershell remember the SSH key passphrase.

You should not use the Open SSH client that comes with Git for Windows. Instead, Windows 10 has its own implementation of Open SSH that is integrated with the system. To achieve this:

1. Start the `ssh-agent` from Windows Services:
  - Type `Services` in the `Start Menu` or `Win+R` and then type `services.msc` to launch the Services window;
  - Find the `OpenSSH Authentication Agent` in the list and double click on it;
  - In the `OpenSSH Authentication Agent Properties` window that appears, choose `Automatic` from the `Startup type:` dropdown and click `Start` from `Service status:`. Make sure it now says `Service status: Running`.

2. Configure Git to use the Windows 10 implementation of OpenSSH by issuing the following command in Powershell:
```
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

3. Configure SSH to automatically add the keys to the agent on startup by editing the `config` file found at `$HOME\.ssh\config` (full path - `C:\Users\%YOUR_USERNAME%\.ssh\config`), and add the following lines:
```
Host *
	AddKeysToAgent yes
	IdentitiesOnly yes
```
  You can also add the following lines if you generated an SSH key with custom name or multiple SSH keys:
```
Host github.com
	HostName github.com
	User your_user_name
	IdentityFile ~/.ssh/your_file_name
```

4. Add your SSH key to the `ssh-agent` by issuing the `ssh-add` command and entering your passphrase:
```
ssh-add $HOME/.ssh/your_file_name
```

5. Done! Now restart your Powershell and even Windows if necessary.


Ref:

- https://newbedev.com/how-to-run-ssh-add-on-windows
- https://gist.github.com/danieldogeanu/16c61e9b80345c5837b9e5045a701c99
- https://newbedev.com/ssh-keygen-no-such-file-or-directory




