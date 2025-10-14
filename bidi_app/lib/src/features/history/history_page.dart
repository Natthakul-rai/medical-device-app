import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class HistoryPage extends StatelessWidget {
  const HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BidiPageShell(
      title: 'ประวัติการเข้าชม',
      subtitle: 'ติดตามกิจกรรมล่าสุดที่เกี่ยวข้องกับเครื่องมือแพทย์ของคุณ',
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: _history.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final item = _history[index];
          return Card(
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              leading: Container(
                width: 46,
                height: 46,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                ),
                child: const Icon(Icons.history, color: Color(0xFF0D47A1)),
              ),
              title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('${item.timestamp}\n${item.description}'),
              isThreeLine: true,
            ),
          );
        },
      ),
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
