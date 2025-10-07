import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'แดชบอร์ด | Medical Device Management',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'devices',
        title: 'เครื่องมือแพทย์ | Medical Device Management',
        loadComponent: () => import('./pages/devices/devices').then((m) => m.DevicesComponent),
      },
      {
        path: 'users',
        title: 'ผู้ใช้งาน | Medical Device Management',
        loadComponent: () => import('./pages/users/users').then((m) => m.UsersComponent),
      },
      {
        path: 'documents',
        title: 'เอกสาร | Medical Device Management',
        loadComponent: () => import('./pages/documents/documents').then((m) => m.DocumentsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
