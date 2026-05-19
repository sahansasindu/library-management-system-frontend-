import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setRoles(roles: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): any[] | null {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : null;
    }
    return null;
  }

  public setToken(key: any, jwtToken: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, jwtToken);
    }
  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token') || '';
    }
    return '';
  }

  public clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isExists(key: any): boolean {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem(key);
      if (token) {
        return true;
      }
    }
    return false;
  }

  public setMemberId(memberId: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('memberId', memberId);
    }
  }

  public getMemberId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('memberId');
    }
    return null;
  }
}

