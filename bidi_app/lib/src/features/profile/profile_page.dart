import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return BidiPageShell(
      title: 'โปรไฟล์ผู้ใช้งาน',
      subtitle: 'ข้อมูลผู้ใช้งาน BIDI MDM สำหรับสิทธิ์การเข้าถึงแบบดูข้อมูลเท่านั้น',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(
                        radius: 36,
                        backgroundColor: colorScheme.primary.withOpacity(0.12),
                        child: Icon(Icons.person_outline, size: 40, color: colorScheme.primary),
                      ),
                      const SizedBox(width: 18),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('นพ. ชยพล สุขะ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                            SizedBox(height: 6),
                            Text('Administrator – ส่วนกลาง ระบบบริหารเครื่องมือแพทย์'),
                            SizedBox(height: 4),
                            Text('chayapon@bidi-hospital.co.th'),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  FilledButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.visibility_outlined),
                    label: const Text('สิทธิ์ปัจจุบัน: View Only'),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('หน้าที่และสิทธิ์การเข้าถึง', style: TextStyle(fontWeight: FontWeight.w700)),
                  SizedBox(height: 12),
                  Text('• ดูรายละเอียดเครื่องมือแพทย์ทุกหมวดหมู่'),
                  Text('• ดูเอกสารประกอบ (PDF)'),
                  Text('• ดูประวัติการเข้าชม/ใช้งานย้อนหลัง'),
                  Text('• ไม่สามารถแก้ไข เพิ่ม หรือ ลบข้อมูลได้'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
