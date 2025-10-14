import 'package:flutter/material.dart';

import '../../widgets/page_shell.dart';

class ScanPage extends StatelessWidget {
  const ScanPage({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return BidiPageShell(
      title: 'สแกน QR Code',
      subtitle: 'ยกอุปกรณ์สแกนไปยัง QR Code ของเครื่องมือเพื่อดูข้อมูลแบบเรียลไทม์',
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [colorScheme.primaryContainer, colorScheme.secondaryContainer],
              ),
              borderRadius: BorderRadius.circular(28),
            ),
            child: Column(
              children: [
                Container(
                  width: 220,
                  height: 220,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.85),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: colorScheme.primary, width: 4),
                  ),
                  child: const Icon(Icons.qr_code_scanner, size: 120),
                ),
                const SizedBox(height: 18),
                const Text(
                  'โฟกัสกล้องไปยัง QR Code เครื่องมือ',
                  style: TextStyle(fontWeight: FontWeight.w600),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                const Text(
                  'ระบบจะโหลดข้อมูลเครื่องมือโดยอัตโนมัติ พร้อมแสดงสถานะล่าสุด',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.black54),
                ),
                const SizedBox(height: 20),
                FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.camera_alt_outlined),
                  label: const Text('เริ่มสแกน'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
