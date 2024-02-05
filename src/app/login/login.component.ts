import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';
  userData: any;

  constructor(private service: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  onSubmit () {
    this.service.onLogin(this.email, this.password).subscribe(
      (response: any) => {
        if (response.status === 'incorrect') {
          this.error = 'Incorrect email or password';
        } else if (response.redirect) {
          this.userData = response.response;
          const jsonString = JSON.stringify(this.userData);
          localStorage.setItem('userData', jsonString);

          //saving generated token to sessiojn storage
          const token = response.token;
          sessionStorage.setItem('token', token);

          this.router.navigate([response.redirect]);
        }
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
