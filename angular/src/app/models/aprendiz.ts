export class Aprendiz{

  _id?: number;
  ficha: number;
  pFormacion: string;
  nombre: string;
  apellido: string;
  tipoId: string;
  identificacion: number;
  email: string;
  telefono: number;
  fechaNacimiento: Date;
  ciudad: string;
  direccion: string;
  sexo: string;
  eps: string;
  numeroEps: number;
  padecimientos: string;
  medicamentos: string;
  acudiente: string;
  acudienteId: string;
  numAcudiente: number;

  constructor(ficha: number, pFormacion: string, nombre: string, apellido: string, tipoId: string, identificacion: number,  email: string, telefono: number, fechaNacimiento: Date, ciudad: string, direccion: string, sexo: string, eps: string, numeroEps: number, padecimientos: string, medicamentos: string, acudiente: string, acudienteId: string, numAcudiente: number){
    
    this.ficha = ficha;
    this.pFormacion = pFormacion;
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoId = tipoId;
    this.identificacion = identificacion;
    this.email = email;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.sexo = sexo;
    this.eps = eps;
    this.numeroEps = numeroEps;
    this.padecimientos = padecimientos;
    this.medicamentos = medicamentos;
    this.acudiente = acudiente;
    this.acudienteId = acudienteId;
    this.numAcudiente = numAcudiente;
  }

}