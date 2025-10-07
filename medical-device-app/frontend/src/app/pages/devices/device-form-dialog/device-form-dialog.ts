import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DeviceItem, DeviceStatus } from '../devices';

interface DeviceFormData {
  mode: 'create' | 'edit';
  device?: DeviceItem;
}

@Component({
  selector: 'app-device-form-dialog',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './device-form-dialog.html',
  styleUrl: './device-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<DeviceFormDialogComponent>);
  protected readonly data = inject<DeviceFormData>(MAT_DIALOG_DATA);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.minLength(3)]],
    status: ['ready' as DeviceStatus, Validators.required],
    location: ['', Validators.required],
    category: ['', Validators.required],
    serial: ['', Validators.required],
    lastCalibration: ['', Validators.required],
    nextCalibration: ['', Validators.required],
  });

  protected readonly statusOptions = [
    { value: 'ready' as DeviceStatus, label: 'พร้อมใช้งาน' },
    { value: 'maintenance' as DeviceStatus, label: 'รอซ่อม' },
    { value: 'broken' as DeviceStatus, label: 'ชำรุด' },
    { value: 'retired' as DeviceStatus, label: 'ยกเลิกใช้งาน' },
  ];

  constructor() {
    if (this.data.device) {
      const { name, code, status, location, category, serial, lastCalibration, nextCalibration } =
        this.data.device;
      this.form.patchValue({
        name,
        code,
        status,
        location,
        category,
        serial,
        lastCalibration,
        nextCalibration,
      });
    }

    if (this.data.mode === 'create') {
      this.form.patchValue({ code: this.generateCode() });
    }
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  private generateCode(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `MD-${random}`;
  }
}
