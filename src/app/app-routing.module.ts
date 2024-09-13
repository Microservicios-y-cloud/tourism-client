import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuPrincipalClienteComponent } from './menu-principal-cliente/menu-principal-cliente.component';
import { MenuPrincipalProveedorComponent } from './menu-principal-proveedor/menu-principal-proveedor.component';
import { VerServiciosCompradosComponent } from './ver-servicios-comprados/ver-servicios-comprados.component';
import { VerNotificacionesComponent } from './ver-notificaciones/ver-notificaciones.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { VerServicioComponent } from './ver-servicio/ver-servicio.component';
import { VerMiCarritoComponent } from './ver-mi-carrito/ver-mi-carrito.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  { path: 'ver-carrito', component: VerMiCarritoComponent },
  { path: 'ver-servicio', component: VerServicioComponent },
  { path: 'editar-servicio', component: EditarServicioComponent },
  { path: 'crear-servicio', component: CrearServicioComponent },
  { path: 'ver-notificaciones', component: VerNotificacionesComponent },
  { path: 'ver-servicios-comprados', component: VerServiciosCompradosComponent },
  { path: 'menu-principal-proveedor', component: MenuPrincipalProveedorComponent },
  { path: 'menu-principal', component: MenuPrincipalClienteComponent },
  { path: 'registrarse', component: CrearUsuarioComponent },
  { path: 'search', component: SearchBarComponent },
];

@NgModule({
  imports: [ 
    FormsModule,
    RouterModule.forRoot(routes,
    {
      bindToComponentInputs: true, // Para poder usar @Input en rutas https://angular.io/guide/router
      onSameUrlNavigation: 'reload' // https://stackoverflow.com/a/52512361
    })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
