import { PrincipalComponent } from './components/principal/principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'aplicacion', component: PrincipalComponent,  ...canActivate(() => redirectUnauthorizedTo(['/'])) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
