import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearAprendizComponent } from './components/crear-aprendiz/crear-aprendiz.component';
import { ListarAprendizComponent } from './components/listar-aprendiz/listar-aprendiz.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearAprendizComponent,
    ListarAprendizComponent,
    InicioComponent,
    LoginComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
