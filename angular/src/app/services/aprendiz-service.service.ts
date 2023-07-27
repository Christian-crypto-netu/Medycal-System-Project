import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AprendizServiceService {
  private baseUrl = 'http://localhost:4000/api/aprendices';


  constructor(private http: HttpClient) { }

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
  crearAprendiz(aprendiz: any) {
    return this.http.post(this.baseUrl, aprendiz);
  }
}
