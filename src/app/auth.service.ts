import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: string = '';
  userData: any;
  path: string = environment.host_path;

  constructor(private http: HttpClient) { }


  onLogin(email: string, password: string) {
    return this.http.post(this.path + '/login', { email, password });
  }

  onRegister(email: string, password: string, name: string, role: string) {
    return this.http.post(this.path + '/register', { email, password, name, role });
  }
}
