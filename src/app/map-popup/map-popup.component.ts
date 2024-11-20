import { Component, AfterViewInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements AfterViewInit, OnDestroy {
  private map: any;
  @Input() lat: number = 0;
  @Input() lon: number = 0;
  @Input() originLat: number = 0;
  @Input() originLon: number = 0;
  @Input() titulo: string = "TITULO";
  isMapVisible: boolean = true;
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Crear el evento de salida

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Eliminar el mapa cuando el componente se destruya
    }
  }

  ngAfterViewInit(): void {
    // Verificar que el contenedor exista antes de inicializar el mapa
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.initMap();
    }
  }

  private initMap(): void {
    // Configuración del mapa
    this.map = L.map('map', {
      center: [this.lat, this.lon],  // Coordenadas del centro del mapa
      attributionControl: false,
      zoom: 14
    });
  
    // Iconos personalizados
    var iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  
    L.Marker.prototype.options.icon = iconDefault;
  
    // Título
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });
  
    // Marca con pop up
    const lon = this.lon + 0.009;
    const lat = this.lat + 0.009;
    const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
    marker.addTo(this.map);
  
    // Marca en forma de círculo
    const mark = L.circleMarker([this.lat, this.lon]).addTo(this.map);
    mark.addTo(this.map);
  
    // Si se han proporcionado las coordenadas de origen, se crea la ruta
    if (this.originLat!=0 && this.originLon!=0) {
      L.Routing.control({
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1/`
        }),
        showAlternatives: true,
        fitSelectedRoutes: false,
        show: false,
        routeWhileDragging: true,
        waypoints: [
          L.latLng(this.originLat, this.originLon),  // Coordenadas de origen
          L.latLng(lat, lon)  // Coordenadas de destino
        ],
      }).addTo(this.map);
    }
  
    // Añadir capa de mapas
    tiles.addTo(this.map);
  }
  

  closeMap() {
    this.close.emit(); // Emitir el evento cuando se hace clic en el botón
  }
}
