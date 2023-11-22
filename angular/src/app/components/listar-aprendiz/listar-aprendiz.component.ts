import { Component, OnInit } from '@angular/core';
import { AprendizServiceService } from '../../services/aprendiz-service.service';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-listar-aprendiz',
  templateUrl: './listar-aprendiz.component.html',
  styleUrls: ['./listar-aprendiz.component.css']
})
export class ListarAprendizComponent implements OnInit {
  aprendizId: string = '';
  ceil = Math.ceil;
  currentPage: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 0;
  busqueda: string = '';
  aprendicesOriginales: any = [];
  fuse!: Fuse<any>;
  showAllFields: boolean = false;
  aprendicesToLoad: any = [];

  constructor( private cdr: ChangeDetectorRef,private aprendizService: AprendizServiceService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const params = {
      page: this.currentPage,
      limit: this.pageSize
    };

    console.log('Cargando datos. Página:', this.currentPage, 'Tamaño de página:', this.pageSize);

    this.aprendizService.obtenerAprendicesPaginados(params).subscribe(
      (data: any) => {
        console.log('Datos cargados con éxito:', data);
        this.aprendicesToLoad = data.data;
        this.totalItems = data.totalDocs;
        this.aprendicesOriginales = data.data.slice();
        this.fuse = new Fuse(this.aprendicesOriginales, { keys: ['identificacion'], includeScore: true, shouldSort: true });
        this.filtrarYActualizar();
      },
      (error) => {
        console.log('Error al cargar datos:', error);
      }
    );
  }

  filtrarYActualizar() {
    console.log('Búsqueda:', this.busqueda);

    if (this.busqueda.trim() === '') {
      this.aprendicesToLoad = this.aprendicesOriginales.slice();
    } else {
      const resultados = this.fuse.search(this.busqueda.trim());
      this.aprendicesToLoad = resultados.map((resultado) => resultado.item);
    }
    console.log('Aprendices después de filtrar y actualizar:', this.aprendicesToLoad);
    this.cdr.detectChanges();
  }

  updateAprendicesToLoad() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.aprendicesToLoad = this.aprendicesOriginales.slice(startIndex, endIndex);
    console.log('Aprendices a cargar en la página actual:', this.aprendicesToLoad);
  }

  toggleShowAllFields() {
    this.showAllFields = !this.showAllFields;
    this.filtrarYActualizar();
  }

  onPageChange(page: number) {
    console.log('Cambio de página. Nueva página:', page);
    this.currentPage = page;
    this.loadData(); 
    //this.filtrarYActualizar(); // Actualizar datos después de cambiar de página
  }

  onPageSizeChange() {
    console.log('Cambio de tamaño de página. Nuevo tamaño de página:', this.pageSize);
    this.loadData();  // Cargar nuevos datos después de cambiar el tamaño de la página
  }

  editarAprendiz(aprendiz: any) {
    this.aprendizService.editarAprendiz(aprendiz._id, aprendiz).subscribe(
      (data) => {
        this.router.navigate(['/editar-aprendiz', aprendiz._id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarAprendiz(aprendiz: any) {
    const id = aprendiz._id;
    this.aprendizService.eliminarAprendiz(id).subscribe(
      (response) => {
        this.loadData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // filtrarAprendices() {
  //   console.log("Búsqueda:", this.busqueda);
  //   if (this.busqueda.trim() === '') {
  //     this.aprendicesToLoad = this.aprendicesOriginales.slice();
  //     console.log(this.aprendicesToLoad);
  //     console.log(this.aprendicesOriginales);
  //   } else {
  //     const resultados = this.fuse.search(this.busqueda.trim());
  //     this.aprendicesToLoad = resultados.map((resultado) => resultado.item);
  //     console.log(this.aprendicesToLoad);
  //   }

  //   this.updateAprendicesToLoad();
  // }

  navigateToHistorial(aprendiz: any): void {
    this.aprendizId = aprendiz._id;  // Asigna el valor a aprendizId
    console.log('Aprendiz ID:', this.aprendizId);
    this.router.navigate(['/historial', this.aprendizId]);
  }
  

  estaAutenticado(): boolean {
    return this.authService.isAuthenticated$.getValue();
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}