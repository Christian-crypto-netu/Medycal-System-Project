import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AprendizServiceService } from '../../services/aprendiz-service.service';

@Component({
  selector: 'app-crear-aprendiz',
  templateUrl: './crear-aprendiz.component.html',
  styleUrls: ['./crear-aprendiz.component.css']
})
export class CrearAprendizComponent implements OnInit {

  form!: FormGroup;
  aprendizId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aprendizService: AprendizServiceService
  ) {
    this.validFormulario();
  }

  get fichaValidation() {
    return this.form.get('ficha')?.invalid && this.form.get('ficha')?.touched;
  }

  get pFormacionValidation() {
    return this.form.get('pFormacion')?.invalid && this.form.get('pFormacion')?.touched;
  }

  get nombreValidation() {
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched;
  }

  get apellidoValidation() {
    return this.form.get('apellido')?.invalid && this.form.get('apellido')?.touched;
  }

  get tipoIdValidation() {
    return this.form.get('tipoId')?.invalid && this.form.get('tipoId')?.touched;
  }

  get identificacionValidation() {
    return this.form.get('identificacion')?.invalid && this.form.get('identificacion')?.touched;
  }

  get emailValidation() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get telefonoValidation() {
    return this.form.get('telefono')?.invalid && this.form.get('telefono')?.touched;
  }

  get fechaNacimientoValidation() {
    return this.form.get('fechaNacimiento')?.invalid && this.form.get('fechaNacimiento')?.touched;
  }

  get ciudadValidation() {
    return this.form.get('ciudad')?.invalid && this.form.get('ciudad')?.touched;
  }

  get direccionValidation() {
    return this.form.get('direccion')?.invalid && this.form.get('direccion')?.touched;
  }

  get sexoValidation() {
    return this.form.get('sexo')?.invalid && this.form.get('sexo')?.touched;
  }

  get epsValidation() {
    return this.form.get('eps')?.invalid && this.form.get('eps')?.touched;
  }

  get acudienteValidation() {
    return this.form.get('acudiente')?.invalid && this.form.get('acudiente')?.touched;
  }

  get acudienteIdValidation() {
    return this.form.get('acudienteId')?.invalid && this.form.get('acudienteId')?.touched;
  }

  get numAcudienteValidation() {
    return this.form.get('numAcudiente')?.invalid && this.form.get('numAcudiente')?.touched;
  }

  validFormulario() {
    this.form = this.fb.group({
      ficha: ['', [Validators.required, Validators.maxLength(11)]],
      pFormacion: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellido: ['', [Validators.required, Validators.minLength(1)]],
      tipoId: ['', Validators.required],
      identificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      fechaNacimiento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      sexo: ['', Validators.required],
      eps: ['', Validators.required],
      numeroEps: [''],
      padecimientos: [''],
      medicamentos: [''],
      acudiente: ['', Validators.required],
      acudienteId: ['', Validators.required],
      numAcudiente: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  enviarFormulario() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Responde el formulario correctamente antes de enviar'
      });
      return;
    }

    const formData = this.form.value;

    if (this.aprendizId) {
      this.aprendizService.editarAprendiz(this.aprendizId, formData).subscribe(
        (response) => {
          Swal.fire('¡Buen trabajo!', '¡El Aprendiz ha sido actualizado!', 'success');
          this.router.navigate(['/listar-aprendiz']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al enviar el formulario'
          });
        }
      );
    } else {
      this.aprendizService.crearAprendiz(formData).subscribe(
        (response) => {
          Swal.fire('¡Buen trabajo!', '¡El formulario ha sido registrado!', 'success');
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al enviar el formulario'
          });
        }
      );
    }
  }

  ngOnInit(): void {
    this.aprendizId = this.route.snapshot.paramMap.get('id') || '';
    if (this.aprendizId) {
      this.cargarInformacionAprendiz(this.aprendizId);
    }
  }

  cargarInformacionAprendiz(id: string) {
    this.aprendizService.obtenerAprendiz(id).subscribe(
      (data: any) => {
        this.form.patchValue({
          ficha: data.ficha,
          pFormacion: data.pFormacion,
          nombre: data.nombre,
          apellido: data.apellido,
          tipoId: data.tipoId,
          identificacion: data.identificacion,
          email: data.email,
          telefono: data.telefono,
          fechaNacimiento: data.fechaNacimiento,
          ciudad: data.ciudad,
          direccion: data.direccion,
          sexo: data.sexo,
          eps: data.eps,
          numeroEps: data.numeroEps,
          padecimientos: data.padecimientos,
          medicamentos: data.medicamentos,
          acudiente: data.acudiente,
          acudienteId: data.acudienteId,
          numAcudiente: data.numAcudiente
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
