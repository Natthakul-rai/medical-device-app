import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import type { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map, shareReplay } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly authService = inject(AuthService);

  protected readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((state) => state.matches), shareReplay(1));

  private readonly isHandsetSignal = toSignal(this.isHandset$, { initialValue: false });

  protected readonly userName = computed(() => this.authService.user()?.name ?? 'Admin');

  protected readonly navItems = [
    {
      icon: 'space_dashboard',
      label: 'Dashboard',
      description: 'ภาพรวมสถานะเครื่องมือ',
      route: '/dashboard',
    },
    {
      icon: 'medical_services',
      label: 'Devices',
      description: 'จัดการข้อมูลเครื่องมือแพทย์',
      route: '/devices',
    },
    {
      icon: 'people',
      label: 'Users',
      description: 'สิทธิ์และข้อมูลผู้ใช้งาน',
      route: '/users',
    },
    {
      icon: 'description',
      label: 'Documents',
      description: 'ไฟล์สอบเทียบและเอกสาร',
      route: '/documents',
    },
  ];

  logout(): void {
    this.authService.logout();
  }

  protected maybeCloseSidenav(drawer: MatSidenav): void {
    if (this.isHandsetSignal()) {
      drawer.close();
    }
  }
}
