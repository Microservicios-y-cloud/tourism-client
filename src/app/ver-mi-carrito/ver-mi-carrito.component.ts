import { Component } from '@angular/core';
import { itemCarrito } from '../models/itemCarrito';
import { servicio } from '../models/servicio';
import { ubicacion } from '../models/ubicacion';
import { servicioAlimentacion } from '../models/servicioAlimentacion';

@Component({
  selector: 'app-ver-mi-carrito',
  templateUrl: './ver-mi-carrito.component.html',
  styleUrl: './ver-mi-carrito.component.css'
})
export class VerMiCarritoComponent {
  //variables
  public itemsCarrito: itemCarrito[] = [];
  public total = 0;

  constructor(

  ) {}

  ngOnInit(): void {
    //Prueba
    let ubicacionPrueba = new ubicacion("dd","dd","dd","dd","dd","dd")
    let alimentacionPrueba = new servicioAlimentacion("dd","dd")
    let servicioPrueba = new servicio(1,"testService","desc",2,ubicacionPrueba,null,null,alimentacionPrueba,null,null)
    let itemsDePrueba = new itemCarrito(1,5,4,null,servicioPrueba)
    let itemsDePrueba2 = new itemCarrito(1,5,30,null,servicioPrueba)
    let itemsDePrueba3 = new itemCarrito(1,5,40,null,servicioPrueba)

    this.itemsCarrito?.push(itemsDePrueba)
    this.itemsCarrito?.push(itemsDePrueba2)
    this.itemsCarrito?.push(itemsDePrueba3)

    this.sumarSubtotales()
  }

  sumarSubtotales() {
    this.itemsCarrito.forEach(element => {
      this.total += element.subTotal
    });
  }

  eliminarItem(item: itemCarrito) {

  }
}
