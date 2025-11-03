import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

import { Device, DeviceStatus } from '../../../core/services/device.service';

@Component({
  selector: 'app-device-detail-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor,
    NgIf,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    DatePipe,
  ],
  templateUrl: './device-detail-dialog.html',
  styleUrl: './device-detail-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceDetailDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeviceDetailDialogComponent>);
  protected readonly data = inject<Device>(MAT_DIALOG_DATA);

  protected readonly statusLabels = {
    'ready': 'พร้อมใช้งาน',
    'maintenance': 'รอซ่อม',
    'broken': 'ชำรุด',
    'retired': 'ยกเลิกใช้งาน',
  } as const;

  protected close(): void {
    this.dialogRef.close();
  }
}
