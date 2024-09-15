import { Component } from '@angular/core';
import { Service } from '../models/service';
import { ubicacion } from '../models/ubicacion';
import { pregunta } from '../models/pregunta';
import { comentario } from '../models/comentario';
import { servicioAlimentacion } from '../models/servicioAlimentacion';
import { servicioAlojamiento } from '../models/servicioAlojamiento';
import { servicioTransporte } from '../models/servicioTransporte';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
  // Variables
  public alimentacionSelected = false;
  public alojamientoSelected = false;
  public transporteSelected = false;

  public ubicacionDelServicio = "";

  // Propiedades para el formulario
  public id = -1
  public comentarios: comentario[] = []
  public preguntas: pregunta[] = []
  

  public nombre = "";
  public ubicacion: ubicacion = new ubicacion("","","","","","")
  public precio = 0;
  public descripcion = "";

  public tipoAlimentacion = "";
  public horarioAlimentacion = "";
  
  public tipoAlojamiento = "";
  public direccionAlojamiento = "";
  public llegadaAlojamiento = "";
  public salidaAlojamiento = "";
  public capacidadAlojamiento = 1;
  
  public tipoTransporte = "";
  public empresaTransporte = "";
  public origenTransporte = "";
  public llegadaTransporte = "";
  public salidaTransporte = "";

  ngOnInit(): void {
    this.cargarServicio();
  }

  cargarServicio() {
    const servicioDePrueba = new Service(
      -1,
      "Ejemplo Servicio",
      "lorem ipsum basljdbsbadkjsabskadj",
      100.050,
      new ubicacion("sasa", "sas", "sdfsdf", "fg", "dfjh", "y"),
      [
        new pregunta(1, "Esto es una pregunta", "1 septiembre"),
        new pregunta(2, "Esto es una pregunta", "10 septiembre"),
        new pregunta(3, "Esto es una pregunta", "11 septiembre")
      ],
      [
        new comentario(1, "Esto es una valoración", 2, "1 Agosto"),
        new comentario(2, "Esto es una valoración", 2, "1 Septiembre"),
        new comentario(3, "Esto es una valoración", 2, "3 Septiembre")
      ],
      new servicioAlimentacion("LUNCH", "7:30 am"),
      new servicioAlojamiento("Hotel de lujo", "12 septiembre", "18 septiembre", "alguna no se jajaj", 2),
      new servicioTransporte("Bus", "12 septiembre", "18 septiembre", "transcaribe", new ubicacion("ss", "ss", "ss", "ss", "ss", "ss"))
    );

    this.id = servicioDePrueba.id;
    this.preguntas = servicioDePrueba.preguntas || [];
    this.comentarios = servicioDePrueba.comentario || [];

    this.nombre = servicioDePrueba.nombre;
    this.ubicacion = servicioDePrueba.ubicacion; // Ajusta según cómo quieres mostrar la ubicación
    this.precio = servicioDePrueba.precioUnitario;
    this.descripcion = servicioDePrueba.descripcion;

    if (servicioDePrueba.servicioAlimentacion) {
      this.alimentacionSelected = true;
      this.tipoAlimentacion = servicioDePrueba.servicioAlimentacion.tipoAlimentacion;
      this.horarioAlimentacion = servicioDePrueba.servicioAlimentacion.horario;
    }

    if (servicioDePrueba.servicioAlojamiento) {
      this.alojamientoSelected = true;
      this.tipoAlojamiento = servicioDePrueba.servicioAlojamiento.tipoAlojamiento;
      this.direccionAlojamiento = servicioDePrueba.servicioAlojamiento.direccion;
      this.llegadaAlojamiento = servicioDePrueba.servicioAlojamiento.fechaLlegada;
      this.salidaAlojamiento = servicioDePrueba.servicioAlojamiento.fechaSalida;
      this.capacidadAlojamiento = servicioDePrueba.servicioAlojamiento.capacidad;
    }

    if (servicioDePrueba.servicioTransporte) {
      this.transporteSelected = true;
      this.tipoTransporte = servicioDePrueba.servicioTransporte.tipoTransporte;
      this.empresaTransporte = servicioDePrueba.servicioTransporte.empresaTransporte;
      this.ubicacionDelServicio = servicioDePrueba.ubicacion.direccion;
      console.log(servicioDePrueba.ubicacion.direccion);
      
      this.origenTransporte = servicioDePrueba.servicioTransporte.origen.direccion;
      this.llegadaTransporte = servicioDePrueba.servicioTransporte.fechaLlegada;
      this.salidaTransporte = servicioDePrueba.servicioTransporte.fechaSalida;
    }
  }

  cambiarCheck(serviceType: string) {
    switch (serviceType) {
      case 'alimentacion':
        this.alimentacionSelected = !this.alimentacionSelected;
        break;
      case 'alojamiento':
        this.alojamientoSelected = !this.alojamientoSelected;
        break;
      case 'transporte':
        this.transporteSelected = !this.transporteSelected;
        break;
    }
  }

  actualizar() {
    
    console.log('Nombre (General):', this.nombre);
    console.log('Ubicación (General):', this.ubicacion);
    console.log('Precio (General):', this.precio);
    console.log('Descripción (General):', this.descripcion);
    let servicioActualizado = new Service(this.id,this.nombre,this.descripcion,this.precio,this.ubicacion,this.preguntas,this.comentarios,null,null,null)

    if (this.alimentacionSelected) {
      let alimentacion = new servicioAlimentacion("","")
      console.log('Categoría: Alimentación');
      console.log('Tipo Alimentación:', this.tipoAlimentacion);
      console.log('Horario Alimentación:', this.horarioAlimentacion);
      alimentacion.tipoAlimentacion = this.tipoAlimentacion
      alimentacion.horario = this.horarioAlimentacion
      servicioActualizado.servicioAlimentacion = alimentacion
    }

    if (this.alojamientoSelected) {
      let alojamiento = new servicioAlojamiento("","","","",0)
      console.log('Categoría: Alojamiento');
      console.log('Tipo Alojamiento:', this.tipoAlojamiento);
      console.log('Dirección Alojamiento:', this.direccionAlojamiento);
      console.log('Llegada Alojamiento:', this.llegadaAlojamiento);
      console.log('Salida Alojamiento:', this.salidaAlojamiento);
      console.log('Capacidad Alojamiento:', this.capacidadAlojamiento);
      alojamiento.tipoAlojamiento = this.tipoAlojamiento
      alojamiento.direccion = this.direccionAlojamiento
      alojamiento.fechaLlegada = this.llegadaAlojamiento
      alojamiento.fechaSalida = this.salidaAlojamiento
      alojamiento.capacidad = this.capacidadAlojamiento
      servicioActualizado.servicioAlojamiento = alojamiento
    }

    if (this.transporteSelected) {
      let transporte= new servicioTransporte("","","","",this.ubicacion)
      console.log('Categoría: Transporte');
      console.log('Tipo Transporte:', this.tipoTransporte);
      console.log('Empresa Transporte:', this.empresaTransporte);
      console.log('Origen Transporte:', this.origenTransporte);
      console.log('Llegada Transporte:', this.llegadaTransporte);
      console.log('Salida Transporte:', this.salidaTransporte);
      transporte.tipoTransporte = this.tipoTransporte
      transporte.empresaTransporte = this.empresaTransporte
      transporte.origen.direccion = this.origenTransporte
      transporte.fechaLlegada = this.llegadaTransporte
      transporte.fechaSalida = this.salidaTransporte
      servicioActualizado.servicioTransporte = transporte
    }

    console.log(servicioActualizado);
    
  }

  actualizarUbicacion(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.ubicacionDelServicio = selectElement.value;
  }
}
