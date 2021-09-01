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

  clearMap(m: any) {
    for (let i in m._layers) {
        if (m._layers[i]._path != undefined) {
            try {
                m.removeLayer(m._layers[i]);
            } catch (e) {
                console.log("problem with " + e + m._layers[i]);
            }
        }
    }
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
    
    let firstpolyline;

    this.mapServiceU.getTrafico().subscribe( ( data:any ) => {
      this.clearMap(mapTrafico);
      for (let i = 0; i < data[0].jams.length; i++) {
          for (let j = 1; j < (data[0].jams[i].line.length - 1); j++) {

              let pointA = new L.LatLng(data[0].jams[i].line[j].y, data[0].jams[i].line[j].x);
              let pointB = new L.LatLng(data[0].jams[i].line[j + 1].y, data[0].jams[i].line[j + 1].x);
              let pointList = [pointA, pointB];

              if (data[0].jams[i].speed < 5) {
                  firstpolyline = new L.Polyline(pointList, {
                      color: 'red',
                      weight: 6,
                      opacity: 0.5,
                      smoothFactor: 1
                  });
              } else {
                  firstpolyline = new L.Polyline(pointList, {
                      color: 'orange',
                      weight: 6,
                      opacity: 0.5,
                      smoothFactor: 1
                  });
              }
              firstpolyline.addTo(mapTrafico);
          }
      }setTimeout(function f(){console.log("out");},100); 
  });

  }
}
