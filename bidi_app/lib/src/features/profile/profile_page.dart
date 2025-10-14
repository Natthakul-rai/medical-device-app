import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return BidiPageShell(
      title: 'โปรไฟล์ผู้ใช้งาน',
      subtitle: 'จัดการข้อมูลส่วนตัวและสิทธิ์การใช้งานในระบบ BIDI MDM',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 38,
                    backgroundColor: colorScheme.primary.withOpacity(0.15),
                    child: Icon(Icons.person_outline, size: 42, color: colorScheme.primary),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('นพ. ชยพล สุขะ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                        SizedBox(height: 4),
                        Text('Administrator • ส่วนกลาง – ระบบบริหารเครื่องมือแพทย์'),
                        SizedBox(height: 4),
                        Text('chayapon@bidi-hospital.co.th'),
                      ],
                    ),
                  ),
                  FilledButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.edit_outlined),
                    label: const Text('แก้ไขโปรไฟล์'),
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
                  Text('สิทธิ์การใช้งาน', style: TextStyle(fontWeight: FontWeight.w700)),
                  SizedBox(height: 12),
                  Text('• จัดการข้อมูลเครื่องมือแพทย์\n• จัดการผู้ใช้งาน\n• อนุมัติเอกสาร\n• ตรวจสอบประวัติการใช้'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
