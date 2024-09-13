import { Component } from '@angular/core';
import { servicio } from '../models/servicio';
import { ubicacion } from '../models/ubicacion';
import { servicioAlimentacion } from '../models/servicioAlimentacion';
import { servicioAlojamiento } from '../models/servicioAlojamiento';
import { servicioTransporte } from '../models/servicioTransporte';
import { pregunta } from '../models/pregunta';
import { comentario } from '../models/comentario';

@Component({
  selector: 'app-ver-servicio',
  templateUrl: './ver-servicio.component.html',
  styleUrl: './ver-servicio.component.css'
})
export class VerServicioComponent {
  //variables
  public servicio: servicio = new servicio(
    -1,
    "",
    "lorem ipsum basljdbsbadkjsabskadj",
    100.050,
    new ubicacion("sasa","sas","sdfsdf","fg","dfjh","y"),
    [new pregunta(1,"Esto es una pregunta","1 septiembre"),new pregunta(2,"Esto es una pregunta","10 septiembre"),new pregunta(3,"Esto es una pregunta","11 septiembre")],
    [new comentario(1,"Esto es una valoracion",2,"1 Agosto"), new comentario(2,"Esto es una valoracion",2,"1 Septiembre"), new comentario(3,"Esto es una valoracion",2,"3 Septiembre")],
    new servicioAlimentacion("LUNCH","7:30 am"),
    new servicioAlojamiento("Hotel de lujo","12 septiembre", "18 septiembre", "alguna no se jajaj", 2),
    new servicioTransporte("Bus", "12 septiembre","18 septiembre","transcaribe",new ubicacion("ss","ss","ss","ss","ss","ss")))

  public cantidad = 1

  ngOninit(): void {

  }

  sumarCantidad() {
    this.cantidad += 1;
  }

  restarCantidad() {
    if(this.cantidad <= 1) {
      this.cantidad = 1
    }
    else {
      this.cantidad -= 1;
    }
  }

  comprar() {

  }

  add_carrito() {

  }

  enviarPregunta() {
    const pregunta = document.getElementById('campo_de_texto') as HTMLInputElement;
    console.log(pregunta.value);
    
  }
}
