---
layout: post
slug: how-to-choose-proper-component-ui-react
title: เราควรเลือก React Component UI อย่่างไร ให้เหมาะสมกับงานของเรา
tags:
  - React
category: React
uuid: 55dtwqq
unsplashImgCoverId: L8KQIPCODV8
---


เมื่อเราพูดถึง Component UI เราจะต้องนึกถึงโปรเจคดังๆ อย่าง [Material UI](https://material-ui.com/) หรือ [Antd](https://ant.design/) แน่ๆ ใช่มั้ยครับ แน่นอนครับการเลือกใช้ Component UI ทำให้ชีวิตเราง่ายขึ้น ประหยัดเวลามากขึ้น

# คำถามคือ Component UI พวกนี้ทำให้เราประหยัดเวลาขึ้นจริงเหรอ ?

ตอบสั้นๆ คือ **ใช่** ถ้าเราแค่เรียกใช้ โดยไม่ปรับแต่งหน้าตาอะไรเลย
แต่ถ้าเราพยายามปรับแต่งหน้าตาละ? มาหาคำตอบได้ในบทความนี้เลยครับ

---

ก่อนอื่นเราต้องมาทำความเข้าใจก่อนว่า ในโลกของแต่งแต้ม Web เราใช้ CSS ในการทำรูปร่าง สีและหน้าตา ถูกมั้ยครับ และในโลกของ React เองก็นำ CSS มาใช้ในหลากหลายวิธีด้วยกัน ซึ่งวิธีได้รับความนิยมคือ

1. Import CSS แบบปกติ
2. CSS Module
3. Use Preprocessor like sass, less
4. CSS-in-JS

# เราควรพิจารณาอะไรบ้างใน Component UI

นอกเหนือจากแค่ความนิยมในท้องตลาดแล้ว มีสิ่งที่เราควรพิจารณาดังต่อไปนี้

1. วิธีที่ใช้ เป็นแบบไหน เช่น CSS-in-JS
2. เปิดโอกาสให้ Customize แค่ไหน
3. Support Theme มั้ย

ส่วนใหญ่แล้ว

# การทำ Theme
