import 'package:flutter/material.dart';

class DocumentsPage extends StatelessWidget {
  const DocumentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final documents = _mockDocuments;

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: documents.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final doc = documents[index];
        return Card(
          child: ListTile(
            leading: const Icon(Icons.picture_as_pdf, color: Colors.redAccent),
            title: Text(doc.title),
            subtitle: Text('เครื่องมือ: ${doc.device} • อัปโหลด: ${doc.uploadedAt}'),
            trailing: IconButton(
              icon: const Icon(Icons.download),
              onPressed: () {},
            ),
          ),
        );
      },
    );
  }
}

class _DocumentInfo {
  const _DocumentInfo(this.title, this.device, this.uploadedAt);

  final String title;
  final String device;
  final String uploadedAt;
}

const _mockDocuments = <_DocumentInfo>[
  _DocumentInfo('ใบรับรองการสอบเทียบ', 'Infusion Pump CZ-200', '08 ม.ค. 2568'),
  _DocumentInfo('คู่มือการใช้งาน', 'Defibrillator PX-10', '20 พ.ย. 2567'),
  _DocumentInfo('รายงานการซ่อม', 'Ventilator V7 Pro', '15 ธ.ค. 2567'),
];
