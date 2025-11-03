import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  department?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  department?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  department?: string;
  password?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiService = inject(ApiService);

  // Get all users (admin only)
  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  // Create new user (admin only)
  createUser(user: CreateUserDto): Observable<User> {
    return this.apiService.post<User>('/users', user);
  }

  // Update user (admin only)
  updateUser(id: number, user: UpdateUserDto): Observable<User> {
    return this.apiService.put<User>(`/users/${id}`, user);
  }

  // Change password (authenticated user)
  changePassword(passwords: ChangePasswordDto): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/auth/change-password', passwords);
  }

  // Register new user (admin only)
  register(user: CreateUserDto): Observable<User> {
    return this.apiService.post<User>('/auth/register', user);
  }
}