import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const CircleAvatar(radius: 36, child: Icon(Icons.person, size: 36)),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('นพ. ชยพล สุขะ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                  SizedBox(height: 4),
                  Text('Administrator'),
                  SizedBox(height: 4),
                  Text('chayapon@bidi-hospital.co.th'),
                ],
              ),
            ],
          ),
          const SizedBox(height: 24),
          const Text('หน่วยงานที่รับผิดชอบ', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const Text('ส่วนกลาง – ระบบบริหารเครื่องมือแพทย์'),
          const SizedBox(height: 24),
          const Text('สิทธิ์การใช้งาน', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const Text('• จัดการข้อมูลเครื่องมือแพทย์\n• จัดการผู้ใช้งาน\n• อนุมัติเอกสาร'),
          const SizedBox(height: 24),
          FilledButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.edit),
            label: const Text('แก้ไขโปรไฟล์'),
          ),
        ],
      ),
    );
  }
}
