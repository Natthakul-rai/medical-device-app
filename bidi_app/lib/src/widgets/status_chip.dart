import 'package:flutter/material.dart';

class StatusChip extends StatelessWidget {
  const StatusChip({required this.label, super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    final colors = _palette[label] ?? _palette['default']!;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: colors.background,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: colors.border, width: 1.2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: colors.dot,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            label,
            style: TextStyle(
              color: colors.text,
              fontWeight: FontWeight.w600,
              fontSize: 12.5,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusPalette {
  const _StatusPalette({
    required this.background,
    required this.border,
    required this.text,
    required this.dot,
  });

  final Color background;
  final Color border;
  final Color text;
  final Color dot;
}

const _palette = <String, _StatusPalette>{
  'พร้อมใช้งาน': _StatusPalette(
    background: Color(0xFFE6F2FF),
    border: Color(0xFF8BB9FF),
    text: Color(0xFF0D47A1),
    dot: Color(0xFF1976D2),
  ),
  'รอซ่อม': _StatusPalette(
    background: Color(0xFFFFF4DE),
    border: Color(0xFFFFD480),
    text: Color(0xFFB26A00),
    dot: Color(0xFFFFA000),
  ),
  'ชำรุด': _StatusPalette(
    background: Color(0xFFFFE6E8),
    border: Color(0xFFFF9AA4),
    text: Color(0xFFC21807),
    dot: Color(0xFFE53935),
  ),
  'default': _StatusPalette(
    background: Color(0xFFEDEDF7),
    border: Color(0xFFC5C6F5),
    text: Color(0xFF3F4EAE),
    dot: Color(0xFF5C6BC0),
  ),
};
