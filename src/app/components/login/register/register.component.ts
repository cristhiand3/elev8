import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg!: FormGroup;
  errorReg: boolean = false;

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.service.register(this.formReg.value).then((response) => {
      if(response == undefined){
        this.errorReg = true;
      }else{
        this.router.navigate(['/aplicacion']);
      }
      })
      .catch((error) => console.error(error));
  }

  onGoogleLogin() {
    this.service.google_login().then((response) => {
      if(response == undefined){
        this.errorReg = true;
      }else{
        this.router.navigate(['/aplicacion']);
      }
      })
      .catch((error) => console.error(error));
  }


}
