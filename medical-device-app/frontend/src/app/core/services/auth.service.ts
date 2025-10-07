import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

const TOKEN_KEY = 'mdm-token';
const USER_KEY = 'mdm-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly _user: WritableSignal<UserProfile | null> = signal(this.restoreUser());

  readonly user = computed(() => this._user());

  login(credentials: { email: string; password: string }): Observable<boolean> {
    const { email, password } = credentials;
    const canLogin = !!email && !!password;

    if (!canLogin) {
      return of(false).pipe(delay(250));
    }

    const mockProfile: UserProfile = {
      name: 'Administrator',
      email,
      role: 'Admin',
    };

    return of(true).pipe(
      delay(400),
      tap(() => {
        this.persistToken('mock-jwt-token');
        this.persistUser(mockProfile);
        this._user.set(mockProfile);
      }),
      map(() => true)
    );
  }

  logout(): void {
    this.storage()?.removeItem(TOKEN_KEY);
    this.storage()?.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.storage()?.getItem(TOKEN_KEY) ?? null;
  }

  private persistToken(token: string): void {
    this.storage()?.setItem(TOKEN_KEY, token);
  }

  private persistUser(user: UserProfile): void {
    this.storage()?.setItem(USER_KEY, JSON.stringify(user));
  }

  private restoreUser(): UserProfile | null {
    const raw = this.storage()?.getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  }

  private storage(): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
}
