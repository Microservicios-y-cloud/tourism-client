import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() { //singleton pattern
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:9000',
        realm: 'myrealm',
        clientId: 'myapp'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined { //singleton pattern
    return this._profile;
  }


  //será ejecutado cuando se inicia la app para decir que tenemos un proveedor de autenticación
  constructor() { }

  async init(){
    console.log('authenticating');
    console.log('init keycloak');
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required' //si no está autenticado, redirige a la página de login
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token;
    }
  }

  login(){
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout({
      redirectUri: 'http:localhost:4200'
    });
  }

}
