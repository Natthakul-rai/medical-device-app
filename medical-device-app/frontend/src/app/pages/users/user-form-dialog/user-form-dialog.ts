import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserItem, UserRole, UserStatus } from '../users';

interface UserFormData {
  mode: 'create' | 'edit';
  user?: UserItem;
}

interface UserFormResult {
  user: Pick<UserItem, 'name' | 'email' | 'role' | 'status'>;
  password?: string;
}

@Component({
  selector: 'app-user-form-dialog',
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
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent, UserFormResult | undefined>);
  protected readonly data = inject<UserFormData>(MAT_DIALOG_DATA);

  protected readonly roles = [
    { value: 'admin' as UserRole, label: 'Admin' },
    { value: 'technician' as UserRole, label: 'Technician' },
    { value: 'viewer' as UserRole, label: 'Viewer' },
  ];

  protected readonly statuses = [
    { value: 'active' as UserStatus, label: 'ใช้งานอยู่' },
    { value: 'suspended' as UserStatus, label: 'ระงับ' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['technician' as UserRole, Validators.required],
    status: ['active' as UserStatus, Validators.required],
    password: ['', [] as any],
  });

  constructor() {
    if (this.data.mode === 'create') {
      this.form.controls.password.addValidators([Validators.required, Validators.minLength(6)]);
    }

    if (this.data.user) {
      const { name, email, role, status } = this.data.user;
      this.form.patchValue({ name, email, role, status });
    }
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, role, status, password } = this.form.getRawValue();

    const result: UserFormResult = {
      user: { name, email, role, status },
      password: password || undefined,
    };

    this.dialogRef.close(result);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
