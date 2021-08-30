import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../services/map.service';


@Component({
  selector: 'app-mapa-trafico',
  templateUrl: './mapa-trafico.component.html',
  styleUrls: ['./mapa-trafico.component.css']
})

export class MapaTraficoComponent implements AfterViewInit {
  mapServiceU:MapService;

  constructor(public mapService: MapService) { 
  this.mapServiceU = mapService;
  }

  ngOnInit(): void {
    let mapTrafico;
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    let mapTrafico = L.map('mapTrafico').setView([19.37596, -99.07000], 11);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="copyright">Openstreetmap</a>'
    }).addTo(mapTrafico);
    
    

  }
}
