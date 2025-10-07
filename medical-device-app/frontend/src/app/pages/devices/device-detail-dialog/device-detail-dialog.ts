import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { DeviceItem, DeviceStatus } from '../devices';

@Component({
  selector: 'app-device-detail-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
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
  protected readonly data = inject<DeviceItem>(MAT_DIALOG_DATA);

  protected readonly statusControl = new FormControl<DeviceStatus>(this.data.status, {
    nonNullable: true,
  });

  protected readonly statusOptions = [
    { value: 'ready' as DeviceStatus, label: 'พร้อมใช้งาน' },
    { value: 'maintenance' as DeviceStatus, label: 'รอซ่อม' },
    { value: 'broken' as DeviceStatus, label: 'ชำรุด' },
    { value: 'retired' as DeviceStatus, label: 'ยกเลิกใช้งาน' },
  ];

  protected close(): void {
    this.dialogRef.close();
  }

  protected save(): void {
    const status = this.statusControl.getRawValue();
    this.dialogRef.close({ status });
  }
}
