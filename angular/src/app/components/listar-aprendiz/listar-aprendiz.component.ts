import { Component, OnInit } from '@angular/core';
import { AprendizServiceService } from '../../services/aprendiz-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-aprendiz',
  templateUrl: './listar-aprendiz.component.html',
  styleUrls: ['./listar-aprendiz.component.css']
})
export class ListarAprendizComponent implements OnInit {

  constructor(private aprendizService: AprendizServiceService, private router: Router) { }

  aprendices: any = [];

  ngOnInit(): void {
    this.obtenerAprendices();
  }

  obtenerAprendices() {
    this.aprendizService.obtenerAprendices().subscribe(
      (data: any) => {
        this.aprendices = data;
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
        // Manejar el error en caso de que ocurra
      }
    );
  }
  
  
}
