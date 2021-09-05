---
title: introduction to TypeScript
uuid: abfn33i
---

# Overview

ก่อนเข้าเรื่องขอเกริ่นอะไรเล็กน้อย หลายๆ คนอาจจะคิดว่าการเขียน TypeScript เป็นเรื่องยาก จะต้องมี Learning Curve ที่สูงมากๆ แน่เลย หรือ จะต้องเรียนรู้อะไรเพิ่มเติมอีก

ผมขอบอกตรงนี้เลยนะครับ เราสามารถใช้ TypeScript แต่ไม่ต้องกำหนด Type ใดๆ เลยก็ได้ ซึ่งไม่ Error ด้วย ขึ้นอยู่กับเราตั้งค่าใน tsconfig.json ยังไง หลายๆ คนอาจจะตั้งคำถามว่าแล้วจะใช้ TypeScript ไปทำไม

แบบนี้ครับ เพื่อให้ง่ายสำหรับการเริ่มต้น เราเริ่มต้นจากเล็กไปหาใหญ่ได้ครับ ตรงไหนอยากได้ความแม่นของ Type หรือ code completion โดย Editor หรือ Feature อื่นๆ ของ TypeScript เราก็ค่อยๆ ใส่ไปครับ แบบนี้จะสบายๆ กว่าครับ

[Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

Introduction
"TypeScript is a superset of JavaScript that compiles to clean JavaScript output." from TypeScript Repo

TypeScript และ C# มาจากคนสร้างคนเดียวกัน คือ Microsoft ดังนั้น ลักษณะของ Syntax จึงมีความคล้ายคลึงสูงมาก แต่อย่างไรก็ตาม TypeScript ยังคงความเป็นเอกลักษณ์ของตัวภาษา Javascript อยู่

ระบบ type ของ TypeScript ให้ประโยชน์หลายๆ อย่างเช่น ทำ code completion ดีขึ้น สามารถหา error ได้ง่ายขึ้น และการสื่อสารระหว่างแต่ละส่วนของโปรแกรมค่อนข้างชัดเจน ว่า type อะไร

TypeScript Feature over JavaScript:
Types
Next-gen JS Features (Compiled for older browser)
Non-JS Feature like interface or Generic
Meta Programming like Decorator
Rich Configtion
Note:

ภาษา TypeScript สามารถทำงานร่วมกับ Javascript ได้เลย
ภาษา TypeScript มีความคล้ายคลึงกับ Javascript ES6 ขึ้นไป
การใช้ Library ของ TypeScript ร่วมกันกับ Javascript นั่นคือ npm ดังนั้น การเลือกใช้ Library ให้พึงสังเกตุว่า Library ตัวนั้นเขียนด้วย Typesctipt หรือไม่
ถ้าเขียนด้วย Javascript โดยส่วนใหญ่จะเขียน Type ของ Javascript แยกเป็นอีกไฟล์ อย่างไรก็ตาม การเรียกใช้ Library ลักษณะนี้อาจจะทำให้ Type ผิดพลาดได้ แต่มีโอกาสเจอน้อยนะ
แต่ถ้าเขียนด้วย TypeScript เลย จะมีโอกาสเข้ากันได้ง่ายกว่า

