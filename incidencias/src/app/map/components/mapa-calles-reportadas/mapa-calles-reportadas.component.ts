import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../services/map.service';
@Component({
  selector: 'app-mapa-calles-reportadas',
  templateUrl: './mapa-calles-reportadas.component.html',
  styleUrls: ['./mapa-calles-reportadas.component.css']

})
export class MapaCallesReportadasComponent implements AfterViewInit {

  mapServiceU: MapService;

  constructor(public mapService: MapService) {
    this.mapServiceU = mapService;
}
  
  ngOnInit(): void {
    let mapid2;

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var mymap2 = L.map('mapid2').setView([19.37596, -99.07000], 12);
    
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11'
  }).addTo(mymap2);

  this.mapServiceU.getCallesCerradas().subscribe((data: any) => {
    let marker;
    let marker2;
    let Icon1 = L.icon({
        iconUrl: '../.././assets/accesdenied.png',
        iconSize: [20, 20],
        iconAnchor: [22, 20],
        popupAnchor: [-3, -76]
    });
    let Icon2 = L.icon({
        iconUrl: '../.././assets/construction.png',
        iconSize: [20, 20],
        iconAnchor: [22, 20],
        popupAnchor: [-3, -76]
    });
    for (let i = 0; i < data[0].jams.length; i++) {
        const opcionesPopUp = L.popup() //Funcion de leaflet
            .setContent(`<p><b>Alcaldia:</b> ${data[0].jams[i].city}</p>
            <p> <b>Calle:</b>  ${data[0].jams[i].street}</p>
            `)

        if (data[0].jams[i].blockType == "ROAD_CLOSED_EVENT") {
            marker = L.marker([data[0].jams[i].line[0].y, data[0].jams[i].line[0].x], { icon: Icon1 }).addTo(mymap2).bindPopup(opcionesPopUp);
        }
        else if (data[0].jams[i].blockType == "ROAD_CLOSED_CONSTRUCTION") {
            marker2 = L.marker([data[0].jams[i].line[0].y, data[0].jams[i].line[0].x], { icon: Icon1 }).addTo(mymap2).bindPopup(opcionesPopUp);
        }
    }
});

  }//fin ng After View

}
