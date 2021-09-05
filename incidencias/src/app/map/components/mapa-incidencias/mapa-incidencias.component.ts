import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from "../../../services/map.service";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mapa-incidencias',
  templateUrl: './mapa-incidencias.component.html',
  styleUrls: ['./mapa-incidencias.component.css']
})
export class MapaIncidenciasComponent implements AfterViewInit {

    @ViewChild('mapClustering', { static: true }) mapContainer: ElementRef;
  time: NgbTimeStruct = { hour: 0, minute: 2, second: 0 };
  mapServiceU: MapService;
  // TIMEPICKER
  minuteStep = 5;
  // DECLARACION DE VARIABLES QUE SE IMPLEMENTAN EN EL FORMULARIO
  obtenerFecha: string = "";
  lista: string[] = [""];// agrupa todos los lugares con incidencias
  arr: any[] = [];
  selectedOptionLugar: string;
  ciudad: string;
  //MAPA CLUSTER VISTO POR TODOS LOS METODOS DE LA CLASE
  mapClustering: any;
  markersCluster;

  markerListCluster;

  //CHECKBOX INCIDENCIAS
  isChecked: Boolean;
  listaIncidencias = [
      { name: "ACCIDENT", check: false },
      { name: "CHIT_CHAT", check: false },
      { name: "HAZARD", check: false },
      { name: "JAM", check: false },
      { name: "POLICE", check: false },
      { name: "ROAD_CLOSED", check: false }
  ]
  horas = [{ name: "Todo el dia", check: false }]
  meses = [{ name: "Todo el mes", check: false }]

  contadorChecked = 0;
  listaIncidenciasCheck;
  markerListClusterCheck = [];
  aux = [];
  Icon1 = L.icon({
      iconUrl: '../.././assets/accesdenied.png',
      iconSize: [20, 20],
      iconAnchor: [22, 20],
      popupAnchor: [-3, -76]
  });

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

  ngAfterViewInit() {

      //Obtenemos de manera dinamica los lugares a mostrar en el input select
      this.mapServiceU.getCities().subscribe((data: any) => {
          this.lista = Object.values(data);
          this.lista.push("Todos");
      });

      this.mapClustering = new L.map(this.mapContainer.nativeElement).setView([19.37596, -99.07000], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="copyright">Openstreetmap</a>'
      }).addTo(this.mapClustering);

      var cont = 0;
      let firstpolyline;
      //function animate(){ INICIO DE LA PELICULA
      do {

          this.mapServiceU.getCallesCerradas2().subscribe((data: any) => {
              let datos = data;
              console.log(datos.length);
              
              this.clearMap(this.mapClustering);
              //let markers = L.markerClusterGroup();
              //let markerList = [];    
              this.markersCluster = L.markerClusterGroup();
              this.markerListCluster = [];

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
                      let marker = L.marker(L.latLng(data[0].jams[i].line[0].y, data[0].jams[i].line[0].x), { icon: Icon1 }).bindPopup(opcionesPopUp);
                      this.markerListCluster.push(marker);
                  }
                  else if (data[0].jams[i].blockType == "ROAD_CLOSED_CONSTRUCTION") {
                      let marker2 = L.marker(L.latLng(data[0].jams[i].line[0].y, data[0].jams[i].line[0].x), { icon: Icon2 }).bindPopup(opcionesPopUp);
                      this.markerListCluster.push(marker2);
                  }

              }
              this.markersCluster.addLayers(this.markerListCluster);
              this.mapClustering.addLayer(this.markersCluster);
              setTimeout(function f() { console.log("outCluster"); }, 100);
          });

          cont = cont + 1;
          setTimeout(function f() { 
            //   console.log("wait"); 
            }, 100);

      } while (cont < 1); 

  }

  buscarIncidencias() {
      for (let i of this.listaIncidencias) {
          i.check = false;
      }
      this.aux = [];
      this.contadorChecked = 0;
    //   console.log(this.selectedOptionLugar);
      this.ciudad = this.selectedOptionLugar;
      //VALIDACION
      if (this.ciudad == null || this.time == null || <any>this.obtenerFecha == "") {
          Swal.fire(
              'ERROR',
              'Faltan llenar campos',
              'error'
          )
      }
      else {
          //LIMPIAMOS EL MAPA CLUSTER
          this.markersCluster.removeLayers(this.markerListCluster);
          if (this.markerListClusterCheck.length > 0) {
              this.markersCluster.removeLayers(this.markerListClusterCheck);
          }
          this.markersCluster = L.markerClusterGroup();
          this.markerListCluster = [];

          let cadenaTime: string;
          this.arr = Object.values(this.time); //Almacenamos el objeto arrojado por la variable time (hora y minuto)

          //CONVIERTE LOS VALORES DE LA HORA Y MINUTO A DOS CIFRAS
          function timeText(d) {
              if (d < 10) { return (d < 10) ? '0' + d.toString() : d.toString(); }
              else { return d.toString(); }
          }

          //CONCATENAMOS LA HORA Y MINUTOS
          cadenaTime = timeText(this.arr[0]) + ":" + timeText(this.arr[1]);
          console.log(cadenaTime);

          //omitimos el tiempo si checkbox "todo el dia" es verdadero
          for (let j of this.horas) {
              if (j.check == true) { cadenaTime = ""; }
          }

          let fecha: any;
          let horarioFinal: string;

          for (let k of this.meses) {
              if (k.check == true && cadenaTime == "") {
                  fecha = (<any>this.obtenerFecha).format("YYYY-MM");
                  //CONCATENAMOS EL TIEMPO Y LA FECHA PARA NUESTRA CONSULTA
                  horarioFinal = fecha + "" + cadenaTime;
              } else {
                  //CONVERTIMOS LA FECHA AL FORMATO UTILIZADO EN LOS JSON DE LA BD
                  fecha = (<any>this.obtenerFecha).format("YYYY-MM-DD");
                  //CONCATENAMOS EL TIEMPO Y LA FECHA PARA NUESTRA CONSULTA
                  horarioFinal = fecha + " " + cadenaTime;
              }
          }

          console.log("horario final: " + horarioFinal);
          if (this.ciudad == "Todos") { this.ciudad = ""; }
          this.mapServiceU.getTraficoCluster(horarioFinal, this.ciudad).subscribe((data: any) => {
              if (data == 0) {
                  Swal.fire(
                      'ERROR',
                      'No se encontraron Incidencias en esa fecha',
                      'error'
                  )
              } else {

                  this.listaIncidenciasCheck = data;

                  //REFRESCAR EL MAPCLUSTERING PARA QUE SE UBIQUE EN LA ZONA DEL LUGAR DONDE QUEREMOS CONSULTAR
                  this.mapClustering.remove();
                  this.mapClustering = new L.map(this.mapContainer.nativeElement).setView([data[0].location.y, data[0].location.x], 13);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      attribution: '&copy; <a href="copyright">Openstreetmap</a>'
                  }).addTo(this.mapClustering);

                  for (let i = 0; i < data.length; i++) {
                      let marker = L.marker(L.latLng(data[i].location.y, data[i].location.x), { icon: this.Icon1 });
                      this.markerListCluster.push(marker);
                  }
                  this.markersCluster.addLayers(this.markerListCluster);
                  this.mapClustering.addLayer(this.markersCluster);
              }

          });
          for (let j of this.horas) {
              if (j.check == true) { j.check = false; }
          }
          for (let k of this.meses) {
              if (k.check == true) { k.check = false; }
          }

          console.log((<any>this.obtenerFecha).format("YYYY-MM-DD"));
      }
  }//Fin SUBMIT

  //CHECKBOX
  filtraIncidencia(e: any) {
      if (this.listaIncidenciasCheck != null) {
          this.markersCluster.removeLayers(this.markerListCluster);
          this.markersCluster.removeLayers(this.markerListClusterCheck);
          this.markerListClusterCheck = [];
          this.clearMap(this.mapClustering);
          var remove = (arr, item) => {
              var i = arr.indexOf(item);
              i !== -1 && arr.splice(i, 1);
          };

          if (e.target.checked) {
              this.contadorChecked = this.contadorChecked + 1;
              this.markersCluster = L.markerClusterGroup();
              this.markersCluster.removeLayers(this.markerListCluster);
              this.markersCluster.removeLayers(this.markerListClusterCheck);
              console.log(this.listaIncidenciasCheck);
              for (let x of this.listaIncidenciasCheck) {
                  if (x.Type == e.target.value) {
                      this.aux.push(x);
                  }
              }
              this.markerListClusterCheck = [];
              for (let i = 0; i < this.aux.length; i++) {
                  console.log(i);
                  let marker = L.marker(L.latLng(this.aux[i].location.y, this.aux[i].location.x), { icon: this.Icon1 });
                  this.markerListClusterCheck.push(marker);
              }
              this.markersCluster.addLayers(this.markerListClusterCheck);
              this.mapClustering.addLayer(this.markersCluster);
              console.log(this.aux);
              console.log("contador " + this.contadorChecked);

          } else {
              this.contadorChecked = this.contadorChecked - 1;
              this.markersCluster = L.markerClusterGroup();
              this.markersCluster.removeLayers(this.markerListCluster);
              this.markersCluster.removeLayers(this.markerListClusterCheck);
              console.log("***");
              console.log(this.aux.length);
              let longitud = this.aux.length;

              for (let x = longitud - 1; x >= 0; x--) {
                  console.log(x);
                  if (this.aux[x].Type == e.target.value) {
                      remove(this.aux, this.aux[x]);
                  }
              }
              console.log(this.aux);
              this.markerListClusterCheck = [];
              for (let i = 0; i < this.aux.length; i++) {
                  let marker = L.marker(L.latLng(this.aux[i].location.y, this.aux[i].location.x), { icon: this.Icon1 });
                  this.markerListClusterCheck.push(marker);
              }
              this.markersCluster.addLayers(this.markerListClusterCheck);
              this.mapClustering.addLayer(this.markersCluster);
              console.log("contador " + this.contadorChecked);

              if (this.contadorChecked == 0) {
                  for (let i = 0; i < this.listaIncidenciasCheck.length; i++) {
                      let marker = L.marker(L.latLng(this.listaIncidenciasCheck[i].location.y, this.listaIncidenciasCheck[i].location.x), { icon: this.Icon1 });
                      this.markerListClusterCheck.push(marker);
                  }
                  this.markersCluster.addLayers(this.markerListClusterCheck);
                  this.mapClustering.addLayer(this.markersCluster);
              }
          }
      }
  }
}