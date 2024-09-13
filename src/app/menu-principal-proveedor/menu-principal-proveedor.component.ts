import { Component } from '@angular/core';
import { servicio } from '../models/servicio';
import { pregunta } from '../models/pregunta';
import { ubicacion } from '../models/ubicacion';
import { servicioAlojamiento } from '../models/servicioAlojamiento';
import { servicioAlimentacion } from '../models/servicioAlimentacion';
import { comentario } from '../models/comentario';
import { servicioTransporte } from '../models/servicioTransporte';
import { itemCarrito } from '../models/itemCarrito';

@Component({
  selector: 'app-menu-principal-proveedor',
  templateUrl: './menu-principal-proveedor.component.html',
  styleUrl: './menu-principal-proveedor.component.css'
})
export class MenuPrincipalProveedorComponent {
  //variables

  public listaServiciosDelProveedor: servicio[] = []
  constructor(

  ) {}


  ngOnInit():void {
    const servicioDePrueba1 = new servicio(
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
    const servicioDePrueba2 = new servicio(
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
    const servicioDePrueba3 = new servicio(
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

    this.listaServiciosDelProveedor.push(servicioDePrueba1)
    this.listaServiciosDelProveedor.push(servicioDePrueba2)
    this.listaServiciosDelProveedor.push(servicioDePrueba3)
    
  }

  add() {

  }

  editar() {

  }

  borrar() {

  }
}
