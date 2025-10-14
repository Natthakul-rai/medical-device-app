import 'package:flutter/material.dart';

import '../../services/device_service.dart';
import '../../widgets/device_card.dart';

class DevicesPage extends StatelessWidget {
  const DevicesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final devices = DeviceService.instance.devices;

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.search),
              hintText: 'ค้นหาเครื่องมือแพทย์',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView.separated(
              itemCount: devices.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final device = devices[index];
                return DeviceCard(device: device, onTap: () => _showDeviceDetail(context, device));
              },
            ),
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
      builder: (context) {
        return DraggableScrollableSheet(
          expand: false,
          maxChildSize: 0.9,
          initialChildSize: 0.75,
          builder: (context, controller) {
            return Padding(
              padding: const EdgeInsets.all(24),
              child: ListView(
                controller: controller,
                children: [
                  Text(device.name, style: Theme.of(context).textTheme.headlineSmall),
                  const SizedBox(height: 8),
                  Text('หมายเลข: ${device.code}'),
                  Text('สถานะ: ${device.statusLabel}'),
                  const SizedBox(height: 16),
                  Text('รายละเอียด', style: Theme.of(context).textTheme.titleMedium),
                  Text(device.description ?? 'ไม่มีข้อมูลรายละเอียด'),
                  const SizedBox(height: 24),
                  FilledButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.qr_code),
                    label: const Text('ดู QR Code'),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}
