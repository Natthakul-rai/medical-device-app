import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class DocumentsPage extends StatelessWidget {
  const DocumentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BidiPageShell(
      title: 'เอกสารเครื่องมือแพทย์',
      subtitle: 'ดาวน์โหลดใบรับรอง คู่มือ และรายงานต่าง ๆ ของเครื่องมือแต่ละรายการ',
      actions: [
        OutlinedButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.cloud_upload_outlined),
          label: const Text('อัปโหลดเอกสาร'),
        ),
      ],
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: _documents.length,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final doc = _documents[index];
          return Card(
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              leading: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.redAccent.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Icon(Icons.picture_as_pdf, color: Colors.redAccent),
              ),
              title: Text(doc.title, style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('เครื่องมือ: ${doc.device}\nอัปโหลด: ${doc.uploadedAt}'),
              isThreeLine: true,
              trailing: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(icon: const Icon(Icons.remove_red_eye_outlined), onPressed: () {}),
                  IconButton(icon: const Icon(Icons.download_rounded), onPressed: () {}),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _DocumentInfo {
  const _DocumentInfo(this.title, this.device, this.uploadedAt);

  final String title;
  final String device;
  final String uploadedAt;
}

const _documents = <_DocumentInfo>[
  _DocumentInfo('ใบรับรองการสอบเทียบ', 'Infusion Pump CZ-200', '08 ม.ค. 2568'),
  _DocumentInfo('คู่มือการใช้งาน', 'Defibrillator PX-10', '20 พ.ย. 2567'),
  _DocumentInfo('รายงานการซ่อม', 'Ventilator V7 Pro', '15 ธ.ค. 2567'),
];
