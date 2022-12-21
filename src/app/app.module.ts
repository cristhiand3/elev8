import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { BalanceComponent } from './components/balance/balance.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'


@NgModule({
  declarations: [
    AppComponent,
    PresupuestoComponent,
    GastoComponent,
    CategoriaComponent,
    PrincipalComponent,
    BalanceComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
