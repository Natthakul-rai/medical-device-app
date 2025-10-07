import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog';

export type UserRole = 'admin' | 'technician' | 'viewer';
export type UserStatus = 'active' | 'suspended';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
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
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly filterGroup = this.fb.nonNullable.group({
    search: [''],
    role: ['all' as 'all' | UserRole],
  });

  private readonly users = signal<UserItem[]>([
    { id: 'U001', name: 'ดร.ธิติมา ศรีสุข', email: 'thitima@hospital.co.th', role: 'admin', status: 'active' },
    { id: 'U002', name: 'ชยพล สุขะ', email: 'chayapon@hospital.co.th', role: 'technician', status: 'active' },
    { id: 'U003', name: 'นิศารัตน์ เพ็ชรรัตน์', email: 'nissarat@hospital.co.th', role: 'viewer', status: 'suspended' },
  ]);

  protected readonly roles = [
    { value: 'admin' as UserRole, label: 'Admin' },
    { value: 'technician' as UserRole, label: 'Technician' },
    { value: 'viewer' as UserRole, label: 'Viewer' },
  ];

  protected readonly columns = ['name', 'email', 'role', 'status', 'actions'];

  protected readonly filteredUsers = computed(() => {
    const { search, role } = this.filterGroup.getRawValue();
    const keyword = search.trim().toLowerCase();

    return this.users().filter((user) => {
      const matchesKeyword = keyword
        ? `${user.name} ${user.email}`.toLowerCase().includes(keyword)
        : true;
      const matchesRole = role === 'all' ? true : user.role === role;
      return matchesKeyword && matchesRole;
    });
  });

  protected trackById(_index: number, item: UserItem): string {
    return item.id;
  }

  protected statusLabel(status: UserStatus): string {
    return status === 'active' ? 'ใช้งานอยู่' : 'ระงับ';
  }

  protected roleLabel(role: UserRole): string {
    return this.roles.find((item) => item.value === role)?.label ?? role;
  }

  protected openCreate(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '480px',
      data: { mode: 'create' as const },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const newUser: UserItem = {
        ...result.user,
        id: `U${Math.floor(Math.random() * 900 + 100)}`,
      };

      this.users.update((items) => [newUser, ...items]);
      this.snackBar.open('เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว', undefined, { duration: 2500 });
    });
  }

  protected editUser(user: UserItem): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '480px',
      data: { mode: 'edit' as const, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.users.update((items) =>
        items.map((item) => (item.id === user.id ? { ...item, ...result.user } : item))
      );
      this.snackBar.open('อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว', undefined, { duration: 2500 });
    });
  }

  protected toggleStatus(user: UserItem): void {
    const updatedStatus: UserStatus = user.status === 'active' ? 'suspended' : 'active';

    this.users.update((items) =>
      items.map((item) => (item.id === user.id ? { ...item, status: updatedStatus } : item))
    );
    this.snackBar.open('เปลี่ยนสถานะผู้ใช้เรียบร้อยแล้ว', undefined, { duration: 2000 });
  }

  protected resetPassword(user: UserItem): void {
    this.snackBar.open(`รีเซ็ตรหัสผ่านสำหรับ ${user.name}`, undefined, { duration: 2500 });
  }

  protected deleteUser(user: UserItem): void {
    this.users.update((items) => items.filter((item) => item.id !== user.id));
    this.snackBar.open(`ลบผู้ใช้ ${user.name} แล้ว`, undefined, { duration: 2000 });
  }
}
