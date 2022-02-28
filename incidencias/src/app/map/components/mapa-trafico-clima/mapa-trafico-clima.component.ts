import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';

@Component({
    selector: 'app-mapa-trafico-clima',
    templateUrl: './mapa-trafico-clima.component.html',
    styleUrls: ['./mapa-trafico-clima.component.css']
})
export class MapaTraficoClimaComponent implements AfterViewInit {



    //Variables
    activarFecha: boolean = true
    fechaConsulta: string = "2021-10-01";
    banderaPausa: boolean = false;
    opcionDatos: string = ''
    banderaMapa: boolean = true;
    map: any;
    activarBtn = true;
    paintLine: boolean = false;
    mapMarkers: any[];
    rangoT: number = 0;
    rangoC: number = 0;
    arregloTrafico: any[];
    nombrePlayPausa: string = "play_circle";
    banderaPlayPausa: boolean = true;
    horarioclima: string = "00:00";
    horariotrafico: string = "00:00";
    markers: any[]=[];
    tamSecciones: number = 0;
    tamTrafico: number = 0;
    num:number;
    marcas: any;
    marcasLineas: any;
    fechatraf;
    horas: string[] = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20", "01:30", "01:40", "01:50", "02:00", "02:10", "02:20", "02:30", "02:40", "02:50", "03:00", "03:10", "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00", "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50", "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30", "08:40", "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20", "12:30", "12:40", "12:50", "13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00", "14:10", "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00", "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50", "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40", "19:50", "20:00", "20:10", "20:20", "20:30", "20:40", "20:50", "21:00", "21:10", "21:20", "21:30", "21:40", "21:50", "22:00", "22:10", "22:20", "22:30", "22:40", "22:50", "23:00", "23:10", "23:20", "23:30", "23:40", "23:50"]
    horasT: string[] = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", "06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40", "06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:10", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "10:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:25", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55", "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15", "22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55"];
            

    timeCtrl = new FormControl(this.horarioclima, []);
    timeCtrl2 = new FormControl(this.horariotrafico, []);
    rangeControlT = new FormControl(this.rangoT, [Validators.max(287), Validators.min(0)]);
    rangeControlC = new FormControl(this.rangoC, [Validators.max(143), Validators.min(0)]);
    
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
    horarioTraficoDenso;
    lista: string[] = [""];//agrupa todos los lugares con incidencias
    listaClima: string[] = [""];//agrupa todos los lugares con incidencias

    //MAPA CLUSTER VISTO POR TODOS LOS METODOS DE LA CLASE
    mapClustering: any;
    

    constructor(public mapService: MapService) {
        this.mapServiceU = mapService;
        this.rangeControlT.valueChanges.subscribe(value => {
            this.rangoT = value;
            console.log(value);
            // this.banderaPausa = true;
            this.ajustarlinea(this.rangoT);
        })

        this.rangeControlC.valueChanges.subscribe(value => {
            this.rangoC = value;
            console.log(value);
            // this.banderaPausa = true;
            this.ajustarlinea(this.rangoC);
        })

    }

    ngAfterViewInit() {

        //Obtenemos de manera dinamica los lugares a mostrar en el input select
        this.mapServiceU.getCities().subscribe((data: any) => {
            this.lista = Object.values(data);
        });

        this.map = L.map('mapid').setView([19.37596, -99.07000], 11);
        //Fondo de trafico denso

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="copyright">Openstreetmap</a>'
        }).addTo(this.map);
    }//FIN OnInit

    controlAtras(event: Event) {
        if (this.rangoC > 0 || this.rangoT>0) {
            this.rangoC -= 1;
            this.rangoT -= 1;
            this.ajustarlinea(this.rangoC);
            this.ajustarlineaTrafico(this.rangoT);
             //that.ajustarTiempo(this.rango)
            event.preventDefault();      
            this.empezar(); 
        }
    }

    controlAdelante(event: Event) {
        if (this.rangoC < 143 || this.rangoT<287) {
            this.rangoC += 1;
            this.rangoT += 1;
            this.ajustarlinea(this.rangoC);
            this.ajustarlineaTrafico(this.rangoT);
            //that.ajustarTiempo(this.rango)
            event.preventDefault();  
            this.empezar();  
        }
    }

    buscarFecha(event: Event, value) {
        this.banderaPausa = false;
        event.preventDefault();
        this.fechaConsulta = value;
        console.log(this.fechaConsulta);
        this.fechaTraficoLineas();
        if (this.opcionDatos == 'climaTrafico' ) {
            this.fechaTrafico(this.fechaConsulta);
            this.fechaClima(this.fechaConsulta);
        } else if (this.opcionDatos == "clima") {
            this.fechaClima(this.fechaConsulta);
        } else{
            this.fechaTrafico(this.fechaConsulta);
        }

    }

    ajustarlinea(rango: number) {
        for (let w = 0; w < 143; w++) {
            if (this.listaClima[rango]["hora"] == this.horas[w]) {
                this.horarioclima = this.horas[w];
            }
        }
    }

    ajustarlineaTrafico(rango: number) {
        for (let w = 0; w < 287; w++) {
            if (w == rango) {
                this.horariotrafico = this.horasT[w];
            }
        }
    }

    fechaTrafico(fecha) {
        this.fechatraf=fecha;
        let tiempo = this.rangoT;

        if (this.banderaMapa) {
            this.mapServiceU.getAlcaldias().subscribe((data: any) => {
                L.geoJSON(data[0]).addTo(this.map);
                this.banderaMapa = false;
            });

            this.mapServiceU.gettraficoDenso(this.fechatraf).subscribe((data: any) => {
                this.arregloTrafico =data;
                //this.tamTrafico = this.arregloTrafico[tiempo]["tiempo "][0];
                console.log("fechaTrafico");
                console.log(this.arregloTrafico);
                this.activarBtn = false;
            });
        }
    }

    fechaClima(fecha) {
        let fechaTermos = fecha;
        this.limpiar;

        this.mapServiceU.getclima(fechaTermos).subscribe((data: any) => {
            this.listaClima = Object.values(data);
            this.num= this.listaClima.length;

            if(this.num != 0){
                this.tamSecciones = this.listaClima[0]["clima"].length;
                console.log(this.num)
                let marker;
                for (let i = 0; i < this.tamSecciones; i++) {
                    let temperaturaSeccion = Number(JSON.stringify(data[0]['clima'][i].datos.main.temp))
                    let nombreSeccion = data[0]['clima'][i].datos.name;
                    let latitud = data[0]['clima'][i].latitud;
                    let longitud = data[0]['clima'][i].longitud;

                    if (temperaturaSeccion > 20) {
                        marker = new L.marker([latitud, longitud], { icon: this.IconCaliente }).addTo(this.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);    
                        this.markers.push(marker);               
                    } else {
                        if (temperaturaSeccion > 13) {
                            marker = new L.marker([latitud, longitud], { icon: this.IconMedio }).addTo(this.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                  
                            this.markers.push(marker);
                        }else{ 
                        marker = new L.marker([latitud, longitud], { icon: this.IconFrio }).addTo(this.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                  
                        this.markers.push(marker);
                        }
                    }  
                    
                }
                this.rangoC += 1;
                this.activarBtn = false;
            }else
                alert("Lo sentimos, este día no esta registrado");
        });
    }

    limpiar(){
        for (let i = 0; i < this.tamSecciones; i++) {
            this.map.removeLayer(this.markers[i]);
        }     
        this.markers = [];
    }

    empezar(){
        let datos = this.num;
        let data = this.listaClima;
        let hora_minuto= this.rangoC;
        let that = this;

        function animacionTermometros(){
            that.limpiar();
            let marker;
            let pausa = that.banderaPausa;
            that.ajustarlinea(hora_minuto);

            for (let i = 0; i < (data[0]["clima"].length); i++) {
                let temperaturaSeccion = Number(JSON.stringify(data[hora_minuto]['clima'][i].datos.main.temp))
                let nombreSeccion = data[hora_minuto]['clima'][i].datos.name;
                let latitud = data[hora_minuto]['clima'][i].latitud;
                let longitud = data[hora_minuto]['clima'][i].longitud;

                if (temperaturaSeccion > 18) {
                    marker = new L.marker([latitud, longitud], { icon: that.IconCaliente }).addTo(that.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);    
                    that.markers.push(marker);               
                }  else {
                    if(temperaturaSeccion < 12){
                        marker = new L.marker([latitud, longitud], { icon: that.IconFrio }).addTo(that.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                  
                        that.markers.push(marker);
                    }else{
                        marker = new L.marker([latitud, longitud], { icon: that.IconMedio }).addTo(that.map).bindPopup(nombreSeccion + " °C: " + temperaturaSeccion);                  
                        that.markers.push(marker);
                    }                   
                }
            }
            hora_minuto++;
            if (hora_minuto < datos && pausa == false) {
                that.rangoC++;
                setTimeout(animacionTermometros, 2000);
            }
        }
        animacionTermometros();
    }

    clearMap(m: any) {
        for (let i in m._layers) {
            if (m._layers[i]._path != undefined) {
                try {
                    m.removeLayer(m._layers[i]);
                } catch (e) {
                    // console.log("problem with " + e + m._layers[i]);
                }
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

    mostrarDato(info) {
        this.opcionDatos = info;
        this.activarFecha = false;
    }


    reproducir(event: Event) {
        event.preventDefault();
        if (this.banderaPlayPausa) {
            if (this.banderaPausa) {
                this.borrarClosters();
            }
            this.banderaPausa = false;
            //Pintar ambos comparando check o radiobutton
            if (this.opcionDatos == 'climaTrafico' ) {
                this.pintarClosters(this.rangoT);
                this.empezar();   
            } else if (this.opcionDatos == "clima") {
                this.empezar();   
            } else{
                this.pintarClosters(this.rangoT);
            }
            //otro pintar clima
            //this.empezar();

            //otro pintar trafico
            // this.pintarClosters(this.rangoC);

            this.nombrePlayPausa = 'pause';
            this.banderaPlayPausa = false;
        } else {
            this.banderaPausa = true;
            this.nombrePlayPausa = 'play_circle';
            this.banderaPlayPausa = true;
        }
        // this.reprodurtor(this.rango); 
    }
    borrarClosters() {
        this.map.removeLayer(this.marcas);
        this.map.removeLayer(this.marcasLineas);
    }

    pintarClosters(rango: number) {

        console.log(this.arregloTrafico[0]["tiempo "]);

        let markers = L.markerClusterGroup();
        let capaLineas = L.markerClusterGroup();
        let segment;
        let tiempo = rango;
        let data = this.arregloTrafico;
        let that = this;
        let pausa: boolean;

        function animacion() {
            // console.log('El tiempo es:' + tiempo);
            pausa = that.banderaPausa
            that.rangoT = tiempo;
            that.ajustarlineaTrafico(tiempo);

            capaLineas.clearLayers();
            that.map.removeLayer(capaLineas);

            markers.clearLayers();
            that.map.removeLayer(markers);

            if (data.length) {
                that.map.removeLayer(markers);
                markers = L.markerClusterGroup();

                that.map.removeLayer(capaLineas);
                capaLineas = L.markerClusterGroup();

                that.horarioTraficoDenso = data[tiempo]["tiempo "][0];
                for (let j = 0; j < (data[tiempo].lineas.length); j++) {
                    for (let k = 0; k < (data[tiempo].lineas[j].length - 1); k++) {
                        let marker = L.marker(new L.LatLng(data[tiempo].lineas[j][k].y, data[tiempo].lineas[j][k].x), { title: "Datos Closters" });
                        markers.addLayer(marker);
                        let pointA = new L.LatLng(data[tiempo].lineas[j][k].y, data[tiempo].lineas[j][k].x);
                        let pointB = new L.LatLng(data[tiempo].lineas[j][k + 1].y, data[tiempo].lineas[j][k + 1].x);
                        let pointList = [pointA, pointB];
                        //console.log(data[tiempo].lineas[j][k+1].y );//lineas[12]
                        segment = new L.Polyline(pointList,
                            {
                                color: '#DB3A34',
                                weight: 6,
                                opacity: 0.5,
                                smoothFactor: 1
                            });
                        segment.addTo(capaLineas);//aggrega al mapa
                    }//fin for k
                }
                
                    that.map.addLayer(capaLineas);
                

                that.marcas = markers;
                that.marcasLineas = capaLineas;
                tiempo++;
                that.map.addLayer(markers);
                if (tiempo < data.length && pausa == false) {
                    setTimeout(animacion, 1000);
                }
            }
        }
        animacion();

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

}
