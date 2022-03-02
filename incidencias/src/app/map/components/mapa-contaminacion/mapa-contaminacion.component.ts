import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { FormControl, Validators } from '@angular/forms';

import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mapa-contaminacion',
  templateUrl: './mapa-contaminacion.component.html',
  styleUrls: ['./mapa-contaminacion.component.css']
})
export class MapaContaminacionComponent implements AfterViewInit {

  //Variables
  fechaConsulta: string = "2020-01-01";
  banderaPausa: boolean = false;
  banderaMapa: boolean = true;
  map: any;
  activarBtn = true;
  paintLine: boolean = false;
  mapMarkers: any[];
  rango: number = 0;
  nombrePlayPausa: string = "play_circle";
  banderaPlayPausa: boolean = true;
  horario: string = "00:00:00";
  markers: any[]=[];
  tamSecciones: number = 0;
  num:number;
  horas: string[] = ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00",  "09:00:00", "10:00:00",  "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00","19:00:00","20:00:00", "21:00:00", "22:00:00", "23:00:00"]
      
  timeCtrl = new FormControl(this.horario, []);
  rangeControl = new FormControl(this.rango, [Validators.max(143), Validators.min(0)]);

  //Iconos
    IconNO = L.icon({
        iconUrl: '../.././assets/NO.png', 
        iconSize: [50, 50],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconNO2 = L.icon({
        iconUrl: '../.././assets/NO2.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconNOx = L.icon({
        iconUrl: '../.././assets/NOx.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });

    IconCO = L.icon({
        iconUrl: '../.././assets/CO.png', 
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconO3 = L.icon({
        iconUrl: '../.././assets/O3.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconPM25 = L.icon({
        iconUrl: '../.././assets/PM2,5.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconPM10 = L.icon({
        iconUrl: '../.././assets/PM10.png', 
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconSO2 = L.icon({
        iconUrl: '../.././assets/SO2.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });
    
    IconPMCO = L.icon({
        iconUrl: '../.././assets/PMCO.png',
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor: [-15, -35]
    });

  @ViewChild('mapClustering', { static: true }) mapContainer: ElementRef;
  time: NgbTimeStruct = { hour: 0, minute: 2, second: 0 };
  mapServiceU: MapService;
  //TIMEPICKER

  lista: string[] = [""];//agrupa todos los lugares con incidencias
  listaContaminacion: string[] = [""];//agrupa todos los lugares con incidencias

  //MAPA CLUSTER VISTO POR TODOS LOS METODOS DE LA CLASE
  mapClustering: any;

  constructor(public mapService: MapService) {
      this.mapServiceU = mapService;
      this.rangeControl.valueChanges.subscribe(value => {
          this.rango = value;
          console.log(value);
          // this.banderaPausa = true;
      })

  }

  ngAfterViewInit() {

      //Obtenemos de manera dinamica los lugares a mostrar en el input select
      

      this.map = L.map('mapid').setView([19.37596, -99.07000], 10);
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

  controlAtras(event: Event) {
    
  }

  controlAdelante(event: Event) {
      
  }

  
  buscarFecha(event: Event, value) {
    this.banderaPausa = false;
    event.preventDefault();
    this.fechaConsulta = value;
    console.log(this.fechaConsulta);
    this.rango = 0;
    this.estaciones() ;
    this.enpezarDatos(this.fechaConsulta);   
  }

  enpezarDatos(fecha){
        let fechaC = fecha;
        this.mapServiceU.getContaminacion(fechaC).subscribe((data: any) => {
            this.listaContaminacion = Object.values(data);
            this.num= this.listaContaminacion[0]["datos"]["contaminacion"].length;
            this.rango++;
            for (let i = 0; i < this.num; i++) {
                if(this.listaContaminacion[0]["datos"]["contaminacion"][i][2] == this.horas[this.rango])
                    this.tamSecciones ++;
            }
            let marker;
            for (let i = 0; i < this.tamSecciones; i++) {
            let latitud = parseFloat(this.lista[0][this.listaContaminacion[0]["datos"]["contaminacion"][i][3]]["latitud"] )
            let longitud = parseFloat(this.lista[0][this.listaContaminacion[0]["datos"]["contaminacion"][i][3]]["longitud"]) 
            
            switch(this.listaContaminacion[0]["datos"]["contaminacion"][i][4]) { 
                case 'NO': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconNO }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                } 
                case 'NO2': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconNO2 }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                }
                case 'NOx': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconNOx }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                } 
                case 'O3': {
                    marker = new L.marker([latitud, longitud], { icon: this.IconO3 }).addTo(this.map).bindPopup( " °C: " );                   
                    break;
                } 
                case 'PM2.5': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconPM25 }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                } 
                case 'PM10': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconPM10 }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                } 
                case 'PMCO': {
                    marker = new L.marker([latitud, longitud], { icon: this.IconPMCO }).addTo(this.map).bindPopup( " °C: " );                   
                    break;
                } 
                case 'SO2': { 
                    marker = new L.marker([latitud, longitud], { icon: this.IconSO2 }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                } 
                case 'CO':{
                    marker = new L.marker([latitud, longitud], { icon: this.IconCO }).addTo(this.map).bindPopup( " °C: " );                  
                    break;
                }
                default: { 
                   break; 
                } 
             } 
            this.markers.push(marker);
            }
        });
    }
  estaciones(){
    this.mapServiceU.getEstaciones().subscribe((data: any) => {
        this.lista = Object.values(data);
    });
  }

  reproducir(event: Event) {
      event.preventDefault();
  }

  fechaTraficoLineas() {
      let that = this;

      if (this.banderaMapa) {
          
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
