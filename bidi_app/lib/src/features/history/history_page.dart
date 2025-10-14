import 'package:flutter/material.dart';

class HistoryPage extends StatelessWidget {
  const HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: _history.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final item = _history[index];
        return Card(
          child: ListTile(
            leading: const Icon(Icons.history),
            title: Text(item.title),
            subtitle: Text('${item.timestamp}\n${item.description}'),
            isThreeLine: true,
          ),
        );
      },
    );
  }
}

class _HistoryEntry {
  const _HistoryEntry(this.title, this.description, this.timestamp);

  final String title;
  final String description;
  final String timestamp;
}

const _history = <_HistoryEntry>[
  _HistoryEntry('เปิดดูเครื่องมือ Infusion Pump', 'สแกน QR Code ใน ICU ชั้น 3', '15 ก.พ. 2568 เวลา 09:42'),
  _HistoryEntry('ดูเอกสารใบรับรองการสอบเทียบ', 'ดาวน์โหลดไฟล์ PDF', '14 ก.พ. 2568 เวลา 17:18'),
  _HistoryEntry('อัปเดตสถานะเครื่องมือ Defibrillator', 'เปลี่ยนเป็นรอซ่อม', '12 ก.พ. 2568 เวลา 11:03'),
];
