import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  submitForm() {
    if (this.email) {
      this.authService.resetPasswordRequest(this.email).subscribe(response => {
        // Manejar la respuesta del servidor, como mostrar un mensaje al usuario
        console.log('Response from server:', response);
        Swal.fire({
          icon: 'success',
          text: 'Correo de recuperacion enviado correctamente.',
          didOpen: () => {
            const container = Swal.getPopup();
            if (container) {
              container.style.fontFamily = 'Nunito';
            }
          }
        });
      });
    } else {
      // Manejar el caso en el que el campo de correo electrónico está vacío
    }
  }
}