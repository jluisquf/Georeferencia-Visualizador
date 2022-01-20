import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { FormControl, Validators } from '@angular/forms';

import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';

@Component({
  selector: 'app-mapa-trafico-clima',
  templateUrl: './mapa-trafico-clima.component.html',
  styleUrls: ['./mapa-trafico-clima.component.css']
})
export class MapaTraficoClimaComponent implements AfterViewInit {

    //Variables
    fechaConsulta: string = "2021-10-01";
    banderaPausa: boolean = false;
    banderaMapa: boolean = true;
    map: any;
    activarBtn = true;
    paintLine: boolean = false;
    mapMarkers: any[];
    rango: number = 0;
    nombrePlayPausa: string = "play_circle";
    banderaPlayPausa: boolean = true;
    horario: string = "00:00";
    markers: any[]=[];
    tamSecciones: number = 0;
    num:number;
        
    timeCtrl = new FormControl(this.horario, []);
    rangeControl = new FormControl(this.rango, [Validators.max(143), Validators.min(0)]);

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

    IconMedio= L.icon({
        iconUrl: '../.././assets/medio.png',
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
        this.rangeControl.valueChanges.subscribe(value => {
            this.rango = value;
            console.log(value);
            // this.banderaPausa = true;
            this.ajustarlinea(this.rango);
        })

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
    }//FIN OnInit

    controlAtras(event: Event) {
    }

    controlAdelante(event: Event) {
    }

    buscarFecha(event: Event, value) {
        this.banderaPausa = false;
        event.preventDefault();
        this.fechaConsulta = value;
        console.log(this.fechaConsulta);
    }

    reproducir(event: Event) {
    }

    ajustarlinea(rango: number) {
        let horas: string[] = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20", "01:30", "01:40", "01:50", "02:00", "02:10", "02:20", "02:30", "02:40", "02:50", "03:00", "03:10", "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00", "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50", "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30", "08:40", "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20", "12:30", "12:40", "12:50", "13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00", "14:10", "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00", "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50", "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40", "19:50", "20:00", "20:10", "20:20", "20:30", "20:40", "20:50", "21:00", "21:10", "21:20", "21:30", "21:40", "21:50", "22:00", "22:10", "22:20", "22:30", "22:40", "22:50", "23:00", "23:10", "23:20", "23:30", "23:40", "23:50"]
        for (let w = 0; w < 143; w++) {
            if (rango == w) {
                this.horario = horas[w];
            }
        }
    }

    pintarLineas(event: Event) {
        if (this.paintLine) {
            this.paintLine = false;
        } else {
            this.paintLine = true;
        }
    }
    

    

}