import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importa el Router para redirigir al usuario
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = ''; // Agrega una variable para manejar mensajes de error

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router // Inyecta el Router
  ) { }

  ngOnInit(): void {
    // Obtener el token de la URL
    this.route.params.subscribe(params => {
      this.token = params['token']; // Asignar el valor del token a la variable
    });
  }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      // Llamar a la función del servicio de autenticación para restablecer la contraseña
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        () => {
          // Contraseña restablecida exitosamente
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña restablecida exitosamente',
            showConfirmButton: false,
            timer: 1500
          });

          this.router.navigate(['/login']);
        },
        (error) => {
          //mostrar un mensaje de error al usuario
          console.error('Error al restablecer la contraseña', error);
          this.errorMessage = 'Error al restablecer la contraseña. Por favor, inténtelo de nuevo.';
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: 'El enlace de restablecimiento de contraseña es inválido o ha caducado',
            showConfirmButton: false,
            timer: 1600
          }); // alerta de error
        }
      );
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error al usuario
      this.errorMessage = 'Las contraseñas no coinciden. Por favor, verifique e inténtelo de nuevo.';
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden. Por favor, verifique e inténtelo de nuevo.',
        showConfirmButton: false,
        timer: 1500
        });// Muestra un mensaje de error
    }
  }
}

