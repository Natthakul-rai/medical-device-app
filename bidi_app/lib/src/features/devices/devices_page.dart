import 'package:flutter/material.dart';

import '../../services/device_service.dart';
import '../../widgets/device_card.dart';
import '../../widgets/page_shell.dart';

class DevicesPage extends StatelessWidget {
  const DevicesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final devices = DeviceService.instance.devices;

    return BidiPageShell(
      title: 'รายการเครื่องมือแพทย์',
      subtitle: 'สำรวจเครื่องมือทั้งหมด พร้อมสถานะล่าสุดและตำแหน่งจัดเก็บ',
      child: Column(
        children: [
          Material(
            elevation: 2,
            borderRadius: BorderRadius.circular(24),
            child: TextField(
              decoration: InputDecoration(
                border: InputBorder.none,
                prefixIcon: const Icon(Icons.search),
                hintText: 'ค้นหาเครื่องมือหรือสแกนหมายเลข',
              ),
            ),
          ),
          const SizedBox(height: 20),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: devices.length,
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              final device = devices[index];
              return DeviceCard(
                device: device,
                onTap: () => _showDeviceDetail(context, device),
              );
            },
          ),
        ],
      ),
    );
  }

  void _showDeviceDetail(BuildContext context, Device device) {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(device.name, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 6),
                Text('หมายเลข: ${device.code}'),
                Text('สถานะ: ${device.statusLabel}'),
                Text('ตำแหน่ง: ${device.location}'),
                const SizedBox(height: 20),
                Text('รายละเอียด', style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 8),
                Text(device.description ?? 'ไม่มีข้อมูลรายละเอียด'),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.qr_code_2),
                  label: const Text('แสดง QR Code'),
                ),
                const SizedBox(height: 12),
              ],
            ),
          ),
        );
      },
    );
  }
}
