import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  username ?: String;

  constructor(private userService: UsersService, private router: Router){
    this.username = this.userService.get_user()?.displayName || 'Invitado';

  }

  salir(){
    this.userService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
