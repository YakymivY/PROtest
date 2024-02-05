import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  confirm: string = '';

  userData: any;

  error: string = '';


  constructor(private service: AuthService, private router: Router) {}

  onSubmit () {
    if (!this.name) {
      this.error = "Please, input your name";
    } else {
      if (!this.email) {
        this.error = "Please, input your email";
      } else {
        if (!this.password) {
          this.error = "Please, input password";
        } else {
          if (this.confirm !== this.password) {
            this.error = "Different passwords";
          } else {
            //registerring user
            this.service.onRegister(this.email, this.password, this.name, "teacher").subscribe(
              (response: any) => {
                if (response.status === "incorrect") {
                  this.error = "This email is already in use";
                } else {
                  // this.router.navigate(['/login']);
                  //logging user in
                  this.service.onLogin(this.email, this.password).subscribe(
                    (response: any) => {
                      if (response.status === 'incorrect') {
                        console.log('Incorrect details');
                        this.error = 'Incorrect email or password';
                      } else if (response.redirect) {
                        console.log('Logging you in');
                        this.userData = response.response;
                        const jsonString = JSON.stringify(this.userData);
                        localStorage.setItem('userData', jsonString);
                        this.router.navigate([response.redirect]);
                      }
                    },
                    error => {
                      console.log('error', error);
                    }
                  );
                }
              },
              error => {
                console.log('error', error);
              }
            );
          }
        }
      }
    }
  }

}
