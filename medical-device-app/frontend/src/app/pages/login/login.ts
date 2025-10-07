import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly loading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((success) => {
        if (success) {
          this.snackBar.open('เข้าสู่ระบบสำเร็จ', undefined, { duration: 2000 });
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('ไม่พบผู้ใช้งาน กรุณาตรวจสอบอีกครั้ง', undefined, { duration: 2500 });
        }
      });
  }

  protected goToForgot(): void {
    this.snackBar.open('กรุณาติดต่อผู้ดูแลระบบเพื่อรีเซ็ตรหัสผ่าน', undefined, { duration: 2500 });
  }
}
