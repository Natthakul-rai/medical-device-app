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
import { startWith, catchError, of } from 'rxjs';

import { DeviceDetailDialogComponent } from './device-detail-dialog/device-detail-dialog';
import { DeviceFormDialogComponent } from './device-form-dialog/device-form-dialog';
import { QrDialogComponent } from './qr-dialog/qr-dialog';
import { DeviceService, Device, DeviceStatus } from '../../core/services/device.service';

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
  private readonly deviceService = inject(DeviceService);

  protected readonly filterGroup = this.fb.nonNullable.group({
    search: [''],
    status: ['all' as 'all' | DeviceStatus],
  });

  private readonly devices = signal<Device[]>([]);
  private readonly loading = signal(false);
  private readonly error = signal<string | null>(null);

  // Load devices on init
  constructor() {
    this.loadDevices();
  }

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
        ? [device.name, device.code, device.location, device.category, device.serial_number]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(keyword)
        : true;
      const matchesStatus = status === 'all' ? true : device.status === status;

      return matchesKeyword && matchesStatus;
    });
  });

  private loadDevices(): void {
    this.loading.set(true);
    this.error.set(null);

    const value = this.filterState();
    const params: any = {};
    if (value.search && value.search.trim()) {
      params.q = value.search.trim();
    }
    if (value.status && value.status !== 'all') {
      params.status = value.status;
    }

    this.deviceService.getDevices(params).pipe(
      catchError(err => {
        console.error('Failed to load devices:', err);
        this.error.set('Failed to load devices');
        this.snackBar.open('ไม่สามารถโหลดข้อมูลอุปกรณ์ได้', 'ปิด', { duration: 3000 });
        return of([]);
      })
    ).subscribe(devices => {
      this.devices.set(devices);
      this.loading.set(false);
    });
  }

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

  protected trackById(_index: number, item: Device): number {
    return item.id;
  }

  // Refresh devices list
  private refreshDevices(): void {
    this.loadDevices();
  }

  // Watch for filter changes
  protected onFilterChange(): void {
    // Debounce filter changes
    setTimeout(() => {
      this.loadDevices();
    }, 300);
  }

  // Show QR Code dialog
  protected showQRCode(device: Device): void {
    this.dialog.open(QrDialogComponent, {
      width: '400px',
      data: {
        deviceCode: device.code,
        deviceName: device.name,
        deviceStatus: this.statusLabel(device.status)
      }
    });
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

      this.deviceService.createDevice(result).subscribe({
        next: (newDevice) => {
          this.devices.update((current) => [newDevice, ...current]);
          this.snackBar.open('เพิ่มเครื่องมือแพทย์เรียบร้อยแล้ว', undefined, { duration: 2500 });
        },
        error: (err) => {
          console.error('Failed to create device:', err);
          this.snackBar.open('ไม่สามารถเพิ่มเครื่องมือแพทย์ได้', 'ปิด', { duration: 3000 });
        }
      });
    });
  }

  protected editDevice(device: Device): void {
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '520px',
      data: { mode: 'edit' as const, device },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.deviceService.updateDevice(device.id, result).subscribe({
        next: (updatedDevice) => {
          this.devices.update((items) =>
            items.map((item) =>
              item.id === device.id ? updatedDevice : item
            )
          );
          this.snackBar.open('อัปเดตข้อมูลเครื่องมือเรียบร้อยแล้ว', undefined, { duration: 2500 });
        },
        error: (err) => {
          console.error('Failed to update device:', err);
          this.snackBar.open('ไม่สามารถอัปเดตข้อมูลเครื่องมือได้', 'ปิด', { duration: 3000 });
        }
      });
    });
  }

  protected deleteDevice(device: Device): void {
    if (confirm(`คุณต้องการลบ "${device.name}" ใช่หรือไม่?`)) {
      this.deviceService.deleteDevice(device.id).subscribe({
        next: () => {
          this.devices.update((items) => items.filter((item) => item.id !== device.id));
          this.snackBar.open(`ลบ ${device.name} แล้ว`, undefined, { duration: 2000 });
        },
        error: (err) => {
          console.error('Failed to delete device:', err);
          this.snackBar.open('ไม่สามารถลบเครื่องมือได้', 'ปิด', { duration: 3000 });
        }
      });
    }
  }

  protected viewDetail(device: Device): void {
    const dialogRef = this.dialog.open(DeviceDetailDialogComponent, {
      width: '640px',
      data: device,
    });

    dialogRef.afterClosed().subscribe((result?: Partial<Device>) => {
      if (result?.status) {
        this.deviceService.updateDevice(device.id, { status: result.status }).subscribe({
          next: (updatedDevice) => {
            this.devices.update((items) =>
              items.map((item) => (item.id === device.id ? updatedDevice : item))
            );
            this.snackBar.open('อัปเดตสถานะเครื่องมือแล้ว', undefined, { duration: 2500 });
          },
          error: (err) => {
            console.error('Failed to update device status:', err);
            this.snackBar.open('ไม่สามารถอัปเดตสถานะเครื่องมือได้', 'ปิด', { duration: 3000 });
          }
        });
      }
    });
  }
}
