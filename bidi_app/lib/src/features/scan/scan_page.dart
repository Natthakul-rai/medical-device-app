import 'package:flutter/material.dart';

class ScanPage extends StatelessWidget {
  const ScanPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 220,
              height: 220,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Theme.of(context).colorScheme.primary, width: 3),
              ),
              child: const Icon(Icons.qr_code_scanner, size: 120),
            ),
            const SizedBox(height: 24),
            const Text(
              'สแกน QR Code',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            const Text('แตะปุ่มด้านล่างเพื่อเริ่มสแกนเครื่องมือแพทย์'),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.camera_alt_outlined),
              label: const Text('เริ่มสแกน'),
            )
          ],
        ),
      ),
    );
  }
}
