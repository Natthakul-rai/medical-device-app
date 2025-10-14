# BIDI Medical Device Management

....

## ภาพรวมโปรเจกต์
- สร้างเว็บแอปสำหรับผู้ดูแลระบบ (Admin) เพื่อบริหารจัดการเครื่องมือแพทย์ภายใต้ชื่อ **BIDI Medical Device Management**
- ใช้ **Angular CLI 20** ร่วมกับ **Angular Material** และออกแบบ UI โทนฟ้า/ขาว พร้อมฟอนต์ Prompt + Roboto รองรับภาษาไทย
- ออกแบบ Layout ให้ตอบสนองอุปกรณ์ต่าง ๆ (Responsive) มี Top Navbar, Sidebar (BIDI MDM) และระบบตรวจสอบสิทธิ์เบื้องต้นด้วย JWT mock

## โครงสร้างไดเรกทอรี (สำคัญ)
```
medical-device-app/
 ├── frontend/      # ซอร์สโค้ด Angular ทั้งหมด
 └── backend/       # โฟลเดอร์สำหรับงานฝั่งแบ็กเอนด์ (ยังว่าง)
bidi_app/             # Flutter แอปสำหรับบุคลากรภาคสนาม (BIDI)
```
ภายใน `frontend/` มีไฟล์สำคัญดังนี้
- `src/app/layout/main-layout/` – โครงสร้าง layout หลัก พร้อมเมนู BIDI MDM
- `src/app/pages/` – หน้าฟังก์ชัน (Login, Dashboard, Devices, Users, Documents)
- `src/app/core/` – Auth Service, Route Guard และ HTTP interceptor สำหรับ JWT mock
- `src/styles.scss` – ตัวแปรและสไตล์กลาง (page shell, ตาราง, status chip ฯลฯ)

## ฟีเจอร์ที่พัฒนาครบแล้ว
- **ระบบ Login**: ฟอร์มตรวจสอบอีเมล/รหัสผ่าน, mock JWT token ใน LocalStorage และ redirect ตามสิทธิ์
- **Dashboard**: การ์ดสรุปสถานะ, กราฟวงกลมแบบ CSS และรายการแจ้งเตือนสอบเทียบ
- **Devices**: ตารางข้อมูลพร้อมค้นหา/กรอง, ปุ่มเพิ่ม/แก้ไข/ลบ, Dialog รายละเอียด และชิปสถานะแบบใหม่
- **Users**: จัดการผู้ใช้, Dialog เพิ่ม/แก้ไข, ปุ่มรีเซ็ตรหัสผ่าน/เปลี่ยนสถานะ
- **Documents**: รายชื่อเอกสาร PDF, ตัวกรอง และ Dialog จำลองการอัปโหลด
- **Layout & Theme**: Sidebar สี่เหลี่ยมสไตล์ BIDI MDM, ปุ่มออกจากระบบใหม่, ตารางมีเส้นแบ่งตรง, ธีม Material ปรับแต่ง

## วิธีเตรียมและรันโปรเจกต์
1. ติดตั้ง Node.js 20 และ Angular CLI 20
2. เข้าไปในโฟลเดอร์ `medical-device-app/frontend`
3. ติดตั้งแพ็กเกจ
   ```bash
   npm install
   ```
4. รันโหมดพัฒนา
   ```bash
   npm start
   ```
   จากนั้นเปิดเบราว์เซอร์ที่ `http://localhost:4200`
5. สร้างไฟล์สำหรับเผยแพร่
   ```bash
   npm run build
   ```

> หมายเหตุ: โปรเจกต์ยังใช้ข้อมูล mock ทั้งหมด ยังไม่มีการเชื่อมต่อ API จริง

## สรุปงานที่ดำเนินการแล้ว (Chronicle)
- สร้างโครงสร้าง Git repo และโปรเจกต์ Angular ใหม่ด้วย CLI
- ติดตั้ง Angular Material + Material Icons + ฟอนต์ Prompt/Roboto
- พัฒนา Layout หลัก, Auth service + Guard, และ routing ครบทุกหน้า
- เติมเนื้อหาหน้าที่สำคัญ (Dashboard, Devices, Users, Documents, Login)
- ปรับธีมรวมทั้ง responsive layout, ตาราง, status chip และ UI รายละเอียดอื่น ๆ
- เปลี่ยนชื่อแบรนด์ทั้งหมดเป็น **BIDI Medical Device Management** และเมนู BIDI MDM
- ปรับ Sidebar ให้เป็นบล็อกสี่เหลี่ยม, logout button ใหม่ และเสริม UX ของหน้า Devices/Users/Documents
- สร้างโปรเจกต์ **Flutter (bidi_app/)** สำหรับบุคลากรที่หน้างาน: Login, สแกน QR, รายการเครื่องมือ, เอกสาร, ประวัติ, โปรไฟล์ (mock data)

## งานถัดไปที่เป็นไปได้
- พัฒนาแบ็กเอนด์จริงหรือเชื่อมต่อ API สำหรับข้อมูลแท้จริง
- ปรับลดขนาด bundle หรือปรับ budget ใน `angular.json` เพื่อไม่ให้เกิด warning ระหว่าง build
- เพิ่มระบบจัดการสิทธิ์หลายระดับ, การอัปโหลดไฟล์จริง และการทดสอบอัตโนมัติ

---
หากต้องการรายละเอียดเพิ่มเติม หรือมีคำสั่งพัฒนาต่อ สามารถอ้างอิงจาก commit history ในสาขา `main`
