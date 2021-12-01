import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { FormControl, Validators } from '@angular/forms';

import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-mapaclima',
    templateUrl: './mapaclima.component.html',
    styleUrls: ['./mapaclima.component.css']
})
export class MapaclimaComponent implements AfterViewInit {

    //Variables
    fechaConsulta: string = "2021-10-01";
    banderaPausa: boolean = false;
    banderaMapa: boolean = true;
    map: any;
    activarBtn = true;
    paintLine: boolean = false;
    mapMarkers: any[];

    //Iconos
    IconFrio = L.icon({
        iconUrl: '../.././assets/frio.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });

    IconCaliente = L.icon({
        iconUrl: '../.././assets/calor.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });

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

        this.map = L.map('mapid').setView([19.37596, -99.07000], 11);
        //Fondo de trafico denso

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            minZoom: 10,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11'
        }).addTo(this.map);


        //Aqui antes estaban los iconos
            
    }//FIN OnInit

    buscarFecha(event: Event, value) {
        this.banderaPausa = false;
        event.preventDefault();
        this.fechaConsulta = value;
        console.log(this.fechaConsulta);
        //this.map.clearLayers()
        this.pintarTermometros(this.fechaConsulta);
        this.fechaTraficoLineas();
    }

    pintarTermometros(fecha){
        

        let fechaTermos = fecha;
        this.mapServiceU.getclima(fechaTermos).subscribe((data: any) => {
            this.listaClima = Object.values(data);
            //console.log(this.listaClima[0]);
            let tamSecciones = this.listaClima[0]["clima"].length;
            
            let marker;
            for (let i = 0; i < tamSecciones; i++) {
                let temperaturaSeccion = Number(JSON.stringify(data[0]['clima'][i].datos.main.temp))
                let nombreSeccion = data[0]['clima'][i].datos.name;
                let latitud = data[0]['clima'][i].latitud;
                let longitud = data[0]['clima'][i].longitud;

                if (temperaturaSeccion > 15) {
                    marker = L.marker([latitud, longitud], { icon: this.IconCaliente }).addTo(this.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                   
                }  else {
                    marker = L.marker([latitud, longitud], { icon: this.IconFrio }).addTo(this.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                  
                }

            }
        });

    }

    fechaTraficoLineas() {
        let that = this;

        if (this.banderaMapa) {
            this.mapServiceU.getAlcaldias().subscribe((data: any) => {
                L.geoJSON(data[0]).addTo(that.map);
                this.banderaMapa = false;
            });
        }

    }


    pintarLineas(event: Event) {
        if (this.paintLine) {
            this.paintLine = false;
        } else {
            this.paintLine = true;
        }
    }

    //function animate(){ INICIO DE LA PELICULA

}
