import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class DocumentsPage extends StatelessWidget {
  const DocumentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BidiPageShell(
      title: 'เอกสารเครื่องมือแพทย์',
      subtitle: 'ดาวน์โหลดใบรับรอง คู่มือ และรายงานต่าง ๆ ของเครื่องมือแต่ละรายการ',
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: _documents.length,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final doc = _documents[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.redAccent.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Icon(Icons.picture_as_pdf, color: Colors.redAccent),
                  ),
                  const SizedBox(width: 18),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(doc.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                        const SizedBox(height: 6),
                        Text('เครื่องมือ: ${doc.device}', style: const TextStyle(color: Colors.black54)),
                        Text('อัปโหลด: ${doc.uploadedAt}', style: const TextStyle(color: Colors.black54)),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.remove_red_eye_outlined),
                        onPressed: () {},
                        iconSize: 20,
                        constraints: const BoxConstraints.tightFor(width: 40, height: 40),
                        padding: EdgeInsets.zero,
                      ),
                      const SizedBox(height: 6),
                      IconButton(
                        icon: const Icon(Icons.download_rounded),
                        onPressed: () {},
                        iconSize: 20,
                        constraints: const BoxConstraints.tightFor(width: 40, height: 40),
                        padding: EdgeInsets.zero,
                      ),
                    ],
                  ),
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
