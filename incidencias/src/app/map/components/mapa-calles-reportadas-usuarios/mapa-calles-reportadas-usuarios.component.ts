import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-mapa-calles-reportadas-usuarios',
  templateUrl: './mapa-calles-reportadas-usuarios.component.html',
  styleUrls: ['./mapa-calles-reportadas-usuarios.component.css']
})
export class MapaCallesReportadasUsuariosComponent implements AfterViewInit {

  mapServiceU: MapService;

  constructor(public mapService: MapService) {
    this.mapServiceU = mapService;
  }

  ngOnInit(): void {
    let mapid3;
  }


  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    let mymap3 = L.map('mapid3').setView([19.37596, -99.07000], 12);


    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap3);


    this.mapService.getCallesCerradas().subscribe( ( data: any ) => {
    let marker;
    const greenIcon = L.icon({iconUrl: '../.././assets/accesdenied.png',
        iconSize: [20, 20],
        iconAnchor: [22, 20],
        popupAnchor: [-3, -76]
    });
    for (let i = 0; i < data[0].alerts.length; i++) {
        if (data[0].alerts[i].type == 'ROAD_CLOSED') {
            marker = L.marker([data[0].alerts[i].location.y, data[0].alerts[i].location.x], {icon: greenIcon}).addTo(mymap3).bindPopup('Soy un nuevo');
        }
      }
  });
  }
}

