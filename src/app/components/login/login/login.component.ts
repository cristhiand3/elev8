import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  errorLogin: boolean = false;

  constructor(private service: UsersService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.service
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        if(response == undefined){
          this.errorLogin = true;
        }else{
          this.router.navigate(['/aplicacion']);
        }
      })
      .catch((error) => {
        console.log(error);

      });
  }

  onGoogleLogin() {
    this.service
      .google_login()
      .then((response) => {
        if(response == undefined){
          this.errorLogin = true;
        }else{
          this.router.navigate(['/aplicacion']);
        }
      })
      .catch((error) => {
        console.log(error);

      });
  }

  onFacebookLogin() {
    this.service.facebook_login().then((response) => {
      if(response == undefined){
        this.errorLogin = true;
      }else{
        this.router.navigate(['/aplicacion']);
      }
      })
      .catch((error) => console.error(error));
  }

}
