import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialService } from '../../services/historial.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  aprendizId: string = '';
  historiales: any[] = [];
  historial = { sintomas: '', procedimientos: '', medicamentos: '' };
  expandedHistorial: any = null;
  fechaInicio: string = '';
  fechaFin: string = '';
  historialEditado: any = {};
  historialIdSeleccionado: string = '';
  
  constructor(private route: ActivatedRoute, private historialService: HistorialService, private authService: AuthService, private router: Router) {
    this.route.params.subscribe(params => {
      this.aprendizId = params['aprendizId'];
      console.log('Aprendiz ID en Historial: ', this.aprendizId);
    });
  }

  ngOnInit() {
    this.obtenerHistoriales();
  }

  guardarHistorial() {
    console.log('Aprendiz ID en Historial: ', this.aprendizId);
  
    this.historialService.crearHistorial(this.aprendizId, this.historial).subscribe(
      () => {
        console.log('Historial guardado exitosamente');
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: "El historial ha sido guardado exitosamente.",
          didOpen: () => {
            const container = Swal.getPopup();
            if (container) {
              container.style.fontFamily = 'Nunito';
            }
          }
        })
        this.obtenerHistoriales();
      },
      error => {
        console.error('Error al guardar el historial:', error);
      }
    );
  }

  obtenerHistoriales() {
    this.historialService.obtenerHistoriales(this.aprendizId).subscribe(
      (data: any) => {
        this.historiales = data.historiales;
        console.log('Historiales obtenidos exitosamente:', this.historiales);
      },
      error => {
        console.error('Error al obtener los historiales:', error);
      }
    );
  }

  toggleHistorial(historial: any) {
    historial.expanded = !historial.expanded;
  }

  obtenerHistorialesPorFecha() {
    // Verifica que las fechas estén definidas
    if (this.fechaInicio && this.fechaFin) {
      this.historialService.obtenerHistorialesPorFecha(this.aprendizId, this.fechaInicio, this.fechaFin)
        .subscribe(
          (data) => {
            this.historiales = data.historiales;
          },
          (error) => {
            console.error('Error al obtener historiales por fecha:', error);
          }
        );
    } else {
      console.error('Por favor, selecciona fechas de inicio y fin.');
    }
  }

  // editarHistorial() {
  //   if (this.historialIdSeleccionado) {
  //     this.historialService.editarHistorial(this.historialIdSeleccionado, this.historialEditado)
  //       .subscribe(
  //         (data) => {
  //           console.log('Historial editado exitosamente:', data.mensaje);
  //           // Actualizar la lista de historiales después de la edición
  //           this.obtenerHistoriales();
  //         },
  //         (error) => {
  //           console.error('Error al editar historial:', error);
  //         }
  //       );
  //   } else {
  //     console.error('No se ha seleccionado un historial para editar.');
  //   }
  // }

  eliminarHistorial(historialId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este historial?')) {
      this.historialService.eliminarHistorial(historialId).subscribe(
        () => {
          console.log('Historial eliminado exitosamente');
          Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: "El historial ha sido eliminado exitosamente.",
            didOpen: () => {
              const container = Swal.getPopup();
              if (container) {
                container.style.fontFamily = 'Nunito';
              }
            }
          })
          // Vuelve a cargar la lista de historiales después de eliminar
          this.obtenerHistoriales();
          
        },
        error => {
          console.error('Error al eliminar el historial:', error);
        }
      );
    }
  }

  descargarPDF(historialId: string) {
    this.historialService.descargarHistorialEnPDF(historialId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Error al descargar el PDF:', error);
      }
    );
  }

  estaAutenticado(): boolean {
    return this.authService.isAuthenticated$.getValue();
  }
  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}
