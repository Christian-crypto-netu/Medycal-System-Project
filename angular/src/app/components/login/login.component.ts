import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UsernameOrEmail: string = '';
  password: string = '';
  errorMessage: string = '';
  maxloginAttempts = 3;
  loginAttempts = 0;
  isLoginBlocked = false;
  loginBlockTime = 30; // Tiempo en segundos para bloquear el inicio de sesión después de los intentos máximos
  loginBlockTimer: any; // Referencia al temporizador de bloqueo
  remainingTime: number = 0; // Tiempo restante en segundos

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.isLoginBlocked) {
      return; // Si el inicio de sesión está bloqueado, no hacer nada
    }

    this.authService.login(this.UsernameOrEmail, this.password).subscribe(
      () => {
        // Redireccionar a la página deseada después del inicio de sesión exitoso
        this.router.navigate(['/listar-aprendiz']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            const container = Swal.getPopup();
            if (container) {
              container.style.fontFamily = 'Nunito';
            }
          }
        });
      },
      (error) => {
        if (error.status === 401 && error.error.message === 'Incorrect password') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: '¡La contraseña es incorrecta! Por favor, intentelo nuevamente.',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              const container = Swal.getPopup();
              if (container) {
                container.style.fontFamily = 'Nunito';
              }
            }
          });
        } else {
          console.error(error);
          console.log('credenciales: ', this.UsernameOrEmail, this.password)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: '¡Ha ocurrido un error durante el inicio de sesión! Por favor, intentelo nuevamente más tarde.',
            showConfirmButton: false,
            timer: 2000,
            didOpen: () => {
              const container = Swal.getPopup();
              if (container) {
                container.style.fontFamily = 'Nunito';
              }
            }
          });
        }
        this.errorMessage = error.message;
        this.loginAttempts++;

        if (this.loginAttempts >= this.maxloginAttempts) {
          this.isLoginBlocked = true;
          this.startLoginBlockTimer();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `¡Se han alcanzado los ${this.maxloginAttempts} intentos máximos de inicio de sesión! Por favor, espere ${this.loginBlockTime} segundos antes de intentarlo nuevamente.`,
            didOpen: () => {
              const container = Swal.getPopup();
              if (container) {
                container.style.fontFamily = 'Nunito';
              }
            }
          })
        }
      }
    );
  }

  startLoginBlockTimer(): void {
    this.remainingTime = this.loginBlockTime;
    this.loginBlockTimer = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        clearInterval(this.loginBlockTimer);
        this.isLoginBlocked = false;
        this.loginAttempts = 0;
        this.remainingTime = 0;
        this.loginBlockTime = 30; // Restablecer los valores
      }
    }, 1000); // Intervalo de actualización del temporizador (1 segundo)
  }
}