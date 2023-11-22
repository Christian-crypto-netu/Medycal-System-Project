import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AprendizServiceService {
  private baseUrl = 'http://localhost:4000/api/aprendices';


  constructor(private http: HttpClient) { }

  obtenerAprendicesPaginados(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  obtenerAprendicesFiltrados(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filtrados`, { params });
  }
  
  
  


  obtenerAprendices(){
    return this.http.get(this.baseUrl);
  }

  obtenerAprendiz(id: string){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  editarAprendiz(id: string, aprendiz: any){
    return this.http.put(`${this.baseUrl}/${id}`, aprendiz)
  }

  eliminarAprendiz(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  crearAprendiz(aprendiz: any): Observable<any> {
    return this.http.post(this.baseUrl, aprendiz).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error && error.error.error === 'La identificación ya está registrada.') {
          return throwError('La identificación ya está registrada.');
        } else {
          return throwError('Error al registrar al aprendiz.');
        }
      })
    );
  }
}
