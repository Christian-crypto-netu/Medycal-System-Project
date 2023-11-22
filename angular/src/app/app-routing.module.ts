import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAprendizComponent } from './components/listar-aprendiz/listar-aprendiz.component';
import { CrearAprendizComponent } from './components/crear-aprendiz/crear-aprendiz.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { HistorialComponent } from './components/historial/historial.component';

const routes: Routes = [
  { path:'', component: InicioComponent },
  { path:'login', component: LoginComponent },
  { path:'crear-aprendiz', component: CrearAprendizComponent },
  { path:'editar-aprendiz/:id', component: CrearAprendizComponent },
  { path:'listar-aprendiz', component: ListarAprendizComponent, canActivate: [AuthGuard]},
  { path: 'historial/:aprendizId', component: HistorialComponent, canActivate: [AuthGuard]},
  { path: 'reset-password/:token', component: ResetPasswordComponent},
  { path: 'reset-password-request', component: ResetPasswordRequestComponent },
  { path:'**', pathMatch:'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
