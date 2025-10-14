class DeviceService {
  DeviceService._();

  static final DeviceService instance = DeviceService._();

  final List<Device> devices = [
    Device(
      code: 'MD-2045',
      name: 'Infusion Pump CZ-200',
      statusLabel: 'พร้อมใช้งาน',
      location: 'ICU ชั้น 3',
      description: 'เครื่อง Infusion Pump สำหรับควบคุมปริมาณยาอย่างแม่นยำ พร้อมระบบแจ้งเตือนฉุกเฉิน.',
    ),
    Device(
      code: 'MD-1021',
      name: 'Defibrillator PX-10',
      statusLabel: 'รอซ่อม',
      location: 'ER',
      description: 'เครื่องกระตุกหัวใจพร้อมบันทึกข้อมูลผู้ป่วย รองรับการเชื่อมต่อกับระบบ PACS.',
    ),
    Device(
      code: 'MD-3301',
      name: 'Ventilator V7 Pro',
      statusLabel: 'ชำรุด',
      location: 'หอผู้ป่วยกึ่งวิกฤติ',
      description: 'เครื่องช่วยหายใจระดับวิกฤติ รองรับการตั้งค่าหลายโหมดตามกลุ่มผู้ป่วย.',
    ),
  ];
}

class Device {
  Device({
    required this.code,
    required this.name,
    required this.statusLabel,
    required this.location,
    this.description,
  });

  final String code;
  final String name;
  final String statusLabel;
  final String location;
  final String? description;
}
