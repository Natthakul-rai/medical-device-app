import 'package:flutter/material.dart';

import '../services/device_service.dart';

class DeviceCard extends StatelessWidget {
  const DeviceCard({required this.device, this.onTap, super.key});

  final Device device;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: colorScheme.primary.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(Icons.medical_services, color: colorScheme.primary),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(device.name, style: const TextStyle(fontWeight: FontWeight.w600)),
                    const SizedBox(height: 4),
                    Text('หมายเลข: ${device.code}', style: const TextStyle(fontSize: 13, color: Colors.black54)),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(Icons.pin_drop_outlined, size: 16, color: colorScheme.outline),
                        const SizedBox(width: 6),
                        Text(device.location, style: const TextStyle(fontSize: 13)),
                      ],
                    ),
                  ],
                ),
              ),
              _StatusChip(status: device.statusLabel),
            ],
          ),
        ),
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    Color background;
    Color foreground;

    switch (status) {
      case 'พร้อมใช้งาน':
        background = const Color(0xFFE3F2FD);
        foreground = const Color(0xFF1E88E5);
        break;
      case 'รอซ่อม':
        background = const Color(0xFFFFF3E0);
        foreground = const Color(0xFFF9A825);
        break;
      case 'ชำรุด':
        background = const Color(0xFFFFEBEE);
        foreground = const Color(0xFFE53935);
        break;
      default:
        background = const Color(0xFFE8EAF6);
        foreground = const Color(0xFF5C6BC0);
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        status,
        style: TextStyle(color: foreground, fontSize: 12, fontWeight: FontWeight.w600),
      ),
    );
  }
}
