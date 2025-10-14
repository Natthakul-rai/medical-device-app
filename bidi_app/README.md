# BIDI Flutter App

แอป Flutter สำหรับดูรายการเครื่องมือแพทย์ภายใต้โครงการ BIDI Medical Device Management ประกอบด้วยฟีเจอร์หลัก:

- เข้าสู่ระบบ (Login)
- สแกน QR Code เพื่อดูข้อมูลเครื่องมือ
- รายการเครื่องมือแพทย์ทั้งหมด
- เอกสารเครื่องมือ (PDF)
- ประวัติการเข้าชม/ใช้งาน
- โปรไฟล์ผู้ใช้งาน

## เริ่มต้นใช้งาน

1. ติดตั้ง Flutter SDK และกำหนด PATH ให้เรียบร้อย
2. ติดตั้ง dependency
   ```bash
   flutter pub get
   ```
3. รันแอป
   ```bash
   flutter run
   ```

## โครงสร้างโค้ดหลัก

- `lib/main.dart` – Entry point ของแอป
- `lib/src/app.dart` – กำหนด Theme และ Navigation หลัก
- `lib/src/features/` – รวมแต่ละหน้าฟีเจอร์
- `lib/src/services/` – Mock services/ข้อมูล
- `lib/src/widgets/` – Widget ที่ใช้ซ้ำ
- `lib/src/theme/app_theme.dart` – กำหนด Theme หลักของแอป

> ปัจจุบันใช้ข้อมูลจำลอง (mock data) และ UI เบื้องต้นเพื่อสาธิตการทำงาน
