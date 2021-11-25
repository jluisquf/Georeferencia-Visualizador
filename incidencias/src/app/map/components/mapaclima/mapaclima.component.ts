import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-mapaclima',
    templateUrl: './mapaclima.component.html',
    styleUrls: ['./mapaclima.component.css']
})
export class MapaclimaComponent implements AfterViewInit {

    @ViewChild('mapClustering', { static: true }) mapContainer: ElementRef;
    time: NgbTimeStruct = { hour: 0, minute: 2, second: 0 };
    mapServiceU: MapService;
    //TIMEPICKER

    lista: string[] = [""];//agrupa todos los lugares con incidencias
    listaClima: string[] = [""];//agrupa todos los lugares con incidencias

    //MAPA CLUSTER VISTO POR TODOS LOS METODOS DE LA CLASE
    mapClustering: any;

    constructor(public mapService: MapService) {
        this.mapServiceU = mapService;

    }

    ngAfterViewInit() {

        //Obtenemos de manera dinamica los lugares a mostrar en el input select
        this.mapServiceU.getCities().subscribe((data: any) => {
            this.lista = Object.values(data);
        });

        this.mapServiceU.getclima('2021-10-23').subscribe((data: any) => {
            this.listaClima = Object.values(data);
            console.log(this.listaClima[0]);
            let tamSecciones = this.listaClima[0]["clima"].length;

            let marker;
            for (let i = 0; i < tamSecciones; i++) {
                let temperaturaSeccion = JSON.stringify(data[0]['clima'][i].datos.main.temp)
                marker = L.marker([data[0]['clima'][i].latitud, data[0]['clima'][i].longitud], { icon: Icon }).addTo(mymap).bindPopup("°C: " + temperaturaSeccion);
                console.log(marker);
            }
        });


        var mymap = L.map('mapid').setView([19.37596, -99.07000], 12);



        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11'
        }).addTo(mymap);



        //function animate(){ INICIO DE LA PELICULA

        let Icon = L.icon({
            iconUrl: '../.././assets/termometro.png',
            iconSize: [32, 32],
            iconAnchor: [32, 32],
            popupAnchor: [-15, -35]
        });

        // this.mapServiceU.getSemaforoizt().subscribe((data: any) => {
        //     let marker;
        //     for (let i = 0; i < data.semaforo.length; i++) {
        //         marker = L.marker([data.semaforo[i].latitud, data.semaforo[i].longitud], { icon: Icon }).addTo(mymap).bindPopup("Hola.");
        //     }
        // });

        // this.mapServiceU.getSemaforoizc().subscribe((data: any) => {
        //     let marker;
        //     for (let i = 0; i < data.semaforo.length; i++) {
        //         marker = L.marker([data.semaforo[i].latitud, data.semaforo[i].longitud], { icon: Icon }).addTo(mymap).bindPopup("Hola2");
        //     }
        // });

        // this.mapServiceU.getSemaforomh().subscribe((data: any) => {
        //     let marker;
        //     for (let i = 0; i < data.semaforo.length; i++) {
        //         marker = L.marker([data.semaforo[i].latitud, data.semaforo[i].longitud], { icon: Icon }).addTo(mymap).bindPopup("Hola3");
        //     }
        // });


    }//FIN OnInit

}
