import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private baseUrl = 'http://localhost:4000/api/historial';

  constructor(private http: HttpClient) { }

  crearHistorial(aprendizId: string, historialData: any): Observable<any> {
    const url = `${this.baseUrl}/historial/${aprendizId}`;
    console.log('URL de la solicitud: ', url);

    return this.http.post(url, historialData);
  };

  obtenerHistoriales(aprendizId: string): Observable<any> {
    const url = `${this.baseUrl}/historial/${aprendizId}`;
    console.log('URL de la solicitud (obtener historiales): ', url);
  
    return this.http.get(url);
  };

  obtenerHistorialesPorFecha(aprendizId: string, fechaInicio: string, fechaFin: string): Observable<any> {
    const url = `${this.baseUrl}/historial/fecha/${aprendizId}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    console.log('URL de la solicitud: ', url);

    return this.http.get(url);
  }

  // editarHistorial(historialId: string, historialData: any): Observable<any> {
  //   const url = `${this.baseUrl}/historial/${historialId}`;
  //   console.log('URL de la solicitud para editar historial: ', url);

  //   return this.http.put(url, historialData);
  // }

  eliminarHistorial(historialId: string): Observable<any> {
    const url = `${this.baseUrl}/historial/${historialId}`;
    return this.http.delete(url);
  }

  descargarHistorialEnPDF(historialId: string): Observable<Blob> {
    const url = `${this.baseUrl}/historial/pdf/${historialId}`;
    return this.http.get<Blob>(url, { responseType: 'blob' as 'json' });
  }
}
