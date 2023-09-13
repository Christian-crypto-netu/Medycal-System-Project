import { Component, OnInit } from '@angular/core';
import { AprendizServiceService } from '../../services/aprendiz-service.service';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { Aprendiz } from 'src/app/models/aprendiz';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-aprendiz',
  templateUrl: './listar-aprendiz.component.html',
  styleUrls: ['./listar-aprendiz.component.css']
})
export class ListarAprendizComponent implements OnInit {

  constructor(private aprendizService: AprendizServiceService, private router: Router, private authService: AuthService) { }

  busqueda: string = '';
  aprendices: any = [];
  fuse!: Fuse<any>;

  ngOnInit(): void {
    this.obtenerAprendices();
  }

  obtenerAprendices() {
    this.aprendizService.obtenerAprendices().subscribe(
      (data: any) => {
        this.aprendices = data;
        // Inicializa el objeto Fuse con la lista de aprendices
        this.fuse = new Fuse(this.aprendices, { keys: ['nombre', 'identificacion'] });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarAprendiz(aprendiz: any) {
    // Lógica para editar el aprendiz
    this.aprendizService.editarAprendiz(aprendiz._id, aprendiz).subscribe(
      (data) => {
        // Edición exitosa, redirigir al formulario de edición en el componente editar-aprendiz
        this.router.navigate(['/editar-aprendiz', aprendiz._id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  eliminarAprendiz(aprendiz: any) {
    const id = aprendiz._id; // Obtener solo el _id del aprendiz
    this.aprendizService.eliminarAprendiz(id).subscribe(
      (response) => {
        // Eliminación exitosa, realizar acciones adicionales si es necesario
        // Actualizar la tabla volviendo a obtener los aprendices
        this.obtenerAprendices();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  filtrarAprendices() {
    if (this.busqueda.trim() === '') {
      // Si el campo de búsqueda está vacío, mostrar todos los aprendices
      this.obtenerAprendices();
    } else {
      // Filtrar aprendices por número de identificación exacto
      this.aprendices = this.aprendices.filter((aprendiz: any) =>
        aprendiz.identificacion.toString() === this.busqueda.trim()
      );
    }
  }
  
  estaAutenticado(): boolean {
    return this.authService.isAuthenticated$.getValue(); // Obtiene el valor actual de isAuthenticated$
  }
  cerrarSesion() {
    
    this.router.navigate(['/login']);
  }

}
