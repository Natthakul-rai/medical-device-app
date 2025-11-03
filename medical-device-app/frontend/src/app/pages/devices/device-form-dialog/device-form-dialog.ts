import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Device, DeviceStatus } from '../../../core/services/device.service';

interface DeviceFormData {
  mode: 'create' | 'edit';
  device?: Device;
}

@Component({
  selector: 'app-device-form-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './device-form-dialog.html',
  styleUrl: './device-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<DeviceFormDialogComponent>);
  protected readonly data = inject<DeviceFormData>(MAT_DIALOG_DATA);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.minLength(3)]],
    status: ['ready' as DeviceStatus, Validators.required],
    location: ['', Validators.required],
    category: ['', Validators.required],
    serial_number: ['', Validators.required],
    specification: [''], // Optional field
    calibration_date: [null as Date | null], // Optional field for date picker
    next_calibration_date: [null as Date | null], // Optional field for date picker
  });

  protected readonly statusOptions = [
    { value: 'ready' as DeviceStatus, label: 'พร้อมใช้งาน' },
    { value: 'maintenance' as DeviceStatus, label: 'รอซ่อม' },
    { value: 'broken' as DeviceStatus, label: 'ชำรุด' },
    { value: 'retired' as DeviceStatus, label: 'ยกเลิกใช้งาน' },
  ];

  constructor() {
    if (this.data.device) {
      const { name, code, status, location, category, serial_number, specification, calibration_date, next_calibration_date } =
        this.data.device;
      this.form.patchValue({
        name,
        code,
        status,
        location,
        category,
        serial_number,
        specification: specification || '',
        calibration_date: this.parseDate(calibration_date),
        next_calibration_date: this.parseDate(next_calibration_date),
      } as any);
    }

    if (this.data.mode === 'create') {
      this.form.patchValue({
        code: this.generateCode(),
        status: 'ready' as DeviceStatus
      });
    }
  }

  // Helper method to convert date string to Date object for date picker
  private parseDate(dateString?: string): Date | null {
    if (!dateString) return null;

    try {
      return new Date(dateString);
    } catch {
      return null;
    }
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    // Convert Date objects back to ISO strings for API
    const processedData = {
      ...formValue,
      calibration_date: formValue.calibration_date instanceof Date ? formValue.calibration_date.toISOString().split('T')[0] : null,
      next_calibration_date: formValue.next_calibration_date instanceof Date ? formValue.next_calibration_date.toISOString().split('T')[0] : null
    };

    this.dialogRef.close(processedData);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  private generateCode(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `MD-${random}`;
  }
}
