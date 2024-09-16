import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  accountManagement() {
    this.keycloak.accountManagement();
  }

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() { //singleton pattern
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: environment.keycloackServiceUrl,
        realm: environment.realm,
        clientId: environment.clientId
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined { //singleton pattern
    return this._profile;
  }


  //será ejecutado cuando se inicia la app para decir que tenemos un proveedor de autenticación
  constructor(private router: Router) { }
  async init() {
    console.log('authenticating');
    console.log('init keycloak');
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required' // si no está autenticado, redirige a la página de login
    });

    if (authenticated) {
      // Cargar el perfil de usuario desde Keycloak
      const profile = (await this.keycloak.loadUserProfile()) as UserProfile;

      // Agregar el token al perfil
      profile.token = this.keycloak.token;

      // Verificar si hay atributos adicionales en el objeto Keycloak
      const keycloakTokenParsed = this.keycloak.tokenParsed as any;

      // Mapear los atributos del token al UserProfile
      if (keycloakTokenParsed && keycloakTokenParsed.attributes) {
        profile.attributes = {
          picture: keycloakTokenParsed.attributes.picture?.[0],
          dob: keycloakTokenParsed.attributes.dob?.[0],
          webUrl: keycloakTokenParsed.attributes.webURL?.[0],
          description: keycloakTokenParsed.attributes.description?.[0],
          userType: keycloakTokenParsed.attributes.userType?.[0],
          socialMedia: keycloakTokenParsed.attributes.socialNetworks ?? []
        };
      }
      this._profile = profile;

      if (this._profile) {
        console.log('authenticated');
        console.log(this._profile);
        console.log('ID: ' + this._profile.id);
        console.log('Username:', this._profile.username);
        console.log('Email:', this._profile.email);
        console.log('First Name:', this._profile.firstName);
        console.log('Last Name:', this._profile.lastName);

        if (this._profile.attributes) {
          console.log('Photo URL:', this._profile.attributes.picture);
          console.log('Date of Birth:', this._profile.attributes.dob);
          console.log('Description:', this._profile.attributes.description);
          console.log('User Type:', this._profile.attributes.userType);
          console.log('Web URL (if supplier):', this._profile.attributes.webUrl);
          console.log('Social media:', this._profile.attributes.socialMedia);
        }
        
        if (this._profile.attributes?.userType == 'supplier') {
          this.router.navigate(['menu-principal-proveedor']);
        } else {
          this.router.navigate(['menu-principal']);
        }
      }

    }
  }
  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: 'http:localhost:4200'
    });
  }

}
