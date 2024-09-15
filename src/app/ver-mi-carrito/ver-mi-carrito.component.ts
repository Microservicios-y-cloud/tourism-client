import { Component } from '@angular/core';
@Component({
  selector: 'app-ver-mi-carrito',
  templateUrl: './ver-mi-carrito.component.html',
  styleUrl: './ver-mi-carrito.component.css'
})
export class VerMiCarritoComponent {
  //variables
  //public itemsCarrito: itemCarrito[] = [];
  public total = 0;

  constructor(

  ) {}

  ngOnInit(): void {
  }

  sumarSubtotales() {
    /*
    this.itemsCarrito.forEach(element => {
      this.total += element.subTotal
    });
    */
  }

  eliminarItem() {

  }
}
