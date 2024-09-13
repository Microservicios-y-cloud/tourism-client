import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './keycloak/keycloak.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { LogInComponent } from './log-in/log-in.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { VerServicioComponent } from './ver-servicio/ver-servicio.component';
import { VerServiciosCompradosComponent } from './ver-servicios-comprados/ver-servicios-comprados.component';
import { VerNotificacionesComponent } from './ver-notificaciones/ver-notificaciones.component';
import { VerMisServiciosComponent } from './ver-mis-servicios/ver-mis-servicios.component';
import { VerMiCarritoComponent } from './ver-mi-carrito/ver-mi-carrito.component';
import { MenuPrincipalClienteComponent } from './menu-principal-cliente/menu-principal-cliente.component';
import { MenuPrincipalProveedorComponent } from './menu-principal-proveedor/menu-principal-proveedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GraphQLModule } from './graphql.module'
import { SearchBarComponent } from './components/search-bar/search-bar.component';

export function kcFactory(kcService: KeycloakService){
  return () => kcService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    LogInComponent,
    CrearServicioComponent,
    EditarServicioComponent,
    VerServicioComponent,
    VerServiciosCompradosComponent,
    VerNotificacionesComponent,
    VerMisServiciosComponent,
    VerMiCarritoComponent,
    MenuPrincipalClienteComponent,
    MenuPrincipalProveedorComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
    /*,
    {
    provide: APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true
  }
    */
],
  bootstrap: [AppComponent]
})
export class AppModule { }
