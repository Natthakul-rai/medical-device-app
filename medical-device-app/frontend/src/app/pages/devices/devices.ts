import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { formatDate } from '@angular/common';
import { startWith } from 'rxjs';

import { DeviceDetailDialogComponent } from './device-detail-dialog/device-detail-dialog';
import { DeviceFormDialogComponent } from './device-form-dialog/device-form-dialog';

export type DeviceStatus = 'ready' | 'maintenance' | 'broken' | 'retired';

export interface DeviceItem {
  id: string;
  name: string;
  code: string;
  status: DeviceStatus;
  addedAt: string;
  location: string;
  category: string;
  serial: string;
  lastCalibration: string;
  nextCalibration: string;
  attachments: { name: string; url: string }[];
}

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  protected readonly filterGroup = this.fb.nonNullable.group({
    search: [''],
    status: ['all' as 'all' | DeviceStatus],
  });

  private readonly devices = signal<DeviceItem[]>([
    {
      id: 'MD-2045',
      name: 'Infusion Pump CZ-200',
      code: 'MD-2045',
      status: 'ready',
      addedAt: '2024-01-12',
      location: 'ICU ชั้น 3',
      category: 'Critical Care',
      serial: 'CZ200-23001',
      lastCalibration: '2023-12-01',
      nextCalibration: '2024-12-01',
      attachments: [
        { name: 'เอกสารคู่มือ.pdf', url: '#' },
        { name: 'ใบรับรองการสอบเทียบ.pdf', url: '#' },
      ],
    },
    {
      id: 'MD-1021',
      name: 'Defibrillator PX-10',
      code: 'MD-1021',
      status: 'maintenance',
      addedAt: '2023-10-02',
      location: 'ER',
      category: 'Emergency',
      serial: 'PX10-12097',
      lastCalibration: '2023-04-15',
      nextCalibration: '2024-04-30',
      attachments: [{ name: 'คู่มือการใช้งาน.pdf', url: '#' }],
    },
    {
      id: 'MD-3301',
      name: 'Ventilator V7 Pro',
      code: 'MD-3301',
      status: 'broken',
      addedAt: '2022-08-19',
      location: 'หอผู้ป่วยกึ่งวิกฤติ',
      category: 'Respiratory',
      serial: 'V7PRO-4403',
      lastCalibration: '2023-01-10',
      nextCalibration: '2023-12-10',
      attachments: [{ name: 'รายงานการซ่อม.pdf', url: '#' }],
    },
    {
      id: 'MD-4502',
      name: 'Ultrasound Diagnostic U-Plus',
      code: 'MD-4502',
      status: 'retired',
      addedAt: '2020-05-08',
      location: 'คลังกลาง',
      category: 'Imaging',
      serial: 'UPLUS-99102',
      lastCalibration: '2022-09-01',
      nextCalibration: '2023-09-01',
      attachments: [{ name: 'ประวัติการใช้งาน.pdf', url: '#' }],
    },
  ]);

  private readonly filterState = toSignal(
    this.filterGroup.valueChanges.pipe(startWith(this.filterGroup.getRawValue())),
    { initialValue: this.filterGroup.getRawValue() }
  );

  protected readonly columns = ['qr', 'name', 'code', 'status', 'addedAt', 'actions'];

  protected readonly filteredDevices = computed(() => {
    const value = this.filterState();
    const keyword = (value.search ?? '').trim().toLowerCase();
    const status = (value.status ?? 'all') as 'all' | DeviceStatus;

    return this.devices().filter((device) => {
      const matchesKeyword = keyword
        ? [device.name, device.code, device.location, device.category]
            .join(' ')
            .toLowerCase()
            .includes(keyword)
        : true;
      const matchesStatus = status === 'all' ? true : device.status === status;

      return matchesKeyword && matchesStatus;
    });
  });

  protected readonly statusOptions: { value: DeviceStatus; label: string }[] = [
    { value: 'ready', label: 'พร้อมใช้งาน' },
    { value: 'maintenance', label: 'รอซ่อม' },
    { value: 'broken', label: 'ชำรุด' },
    { value: 'retired', label: 'ยกเลิกใช้งาน' },
  ];

  protected readonly statusLabel = (status: DeviceStatus): string =>
    this.statusOptions.find((item) => item.value === status)?.label ?? status;

  protected statusClass(status: DeviceStatus): string {
    switch (status) {
      case 'ready':
        return 'status-chip status-ready';
      case 'maintenance':
        return 'status-chip status-maintenance';
      case 'broken':
        return 'status-chip status-broken';
      default:
        return 'status-chip status-retired';
    }
  }

  protected trackById(_index: number, item: DeviceItem): string {
    return item.id;
  }

  protected addDevice(): void {
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '520px',
      data: { mode: 'create' as const },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const newDevice: DeviceItem = {
        ...result,
        id: result.code,
        attachments: [],
        addedAt: formatDate(new Date(), 'yyyy-MM-dd', 'th'),
      };

      this.devices.update((current) => [newDevice, ...current]);
      this.snackBar.open('เพิ่มเครื่องมือแพทย์เรียบร้อยแล้ว', undefined, { duration: 2500 });
    });
  }

  protected editDevice(device: DeviceItem): void {
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '520px',
      data: { mode: 'edit' as const, device },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.devices.update((items) =>
        items.map((item) =>
          item.id === device.id ? { ...item, ...result, attachments: item.attachments } : item
        )
      );
      this.snackBar.open('อัปเดตข้อมูลเครื่องมือเรียบร้อยแล้ว', undefined, { duration: 2500 });
    });
  }

  protected deleteDevice(device: DeviceItem): void {
    this.devices.update((items) => items.filter((item) => item.id !== device.id));
    this.snackBar.open(`ลบ ${device.name} แล้ว`, undefined, { duration: 2000 });
  }

  protected viewDetail(device: DeviceItem): void {
    const dialogRef = this.dialog.open(DeviceDetailDialogComponent, {
      width: '640px',
      data: device,
    });

    dialogRef.afterClosed().subscribe((result?: Partial<DeviceItem>) => {
      if (result?.status) {
        this.devices.update((items) =>
          items.map((item) => (item.id === device.id ? { ...item, status: result.status! } : item))
        );
        this.snackBar.open('อัปเดตสถานะเครื่องมือแล้ว', undefined, { duration: 2500 });
      }
    });
  }
}
