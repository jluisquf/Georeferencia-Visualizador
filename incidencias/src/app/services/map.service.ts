import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";//para comunicar con nuestra API REST

@Injectable({
  providedIn: 'root'
})
export class MapService {
  //readonly URL_API= 'http://localhost:3000';
  readonly URL_API= 'http://palancar.izt.uam.mx:4005';

  constructor(private http:HttpClient) { }

  //2020-01-14 05:57:00:000
  getTrafico(){
    return this.http.get(this.URL_API +'/trafico');
    //return this.http.get(this.URL_API +'/trafico'+'/2020-01-14 05:57:00:000');
  }
  ////////////////////////////////////////////////////////////////////////Peticiones para el formulario
  getTraficoCluster(date:any,city:any){
    console.log(this.URL_API +'/trafico/jams/'+date+'/'+city);
    return this.http.get(this.URL_API +'/trafico/jams/'+date+'/'+city);
  }

  /*getTraficoClusterAll(date:any){
    return this.http.get(this.URL_API +'/trafico/jams/'+date);
  }*/
  getCities(){
    return this.http.get(this.URL_API+'/trafico/cities');
  }
  ///////////////////////////////////////////////////////////////////////
  getSemaforoizt(){
    return this.http.get(this.URL_API+'/semaforoizt');
  }
  getSemaforoizc(){
    return this.http.get(this.URL_API+'/semaforoizc');
  }
  getSemaforomh(){
    return this.http.get(this.URL_API+'/semaforomh');
  }
  getCallesCerradas(){
    return this.http.get(this.URL_API+'/callescerradas');
  }
  getCallesCerradas2(){
    return this.http.get(this.URL_API+'/trafico');
    //return this.http.get(this.URL_API +'/trafico'+'/2020-01-14 05:57:00:000');
  }
  getAlcaldias(){
    return this.http.get(this.URL_API+'/alcaldias');
  }
  getIncidencias(){
    return this.http.get(this.URL_API+'/incidencias');
  }
  gettraficoDenso( fecha : string ){
    if(fecha.substring(0,4) == "2021")
      return this.http.get(this.URL_API+'/traficoDenso2021/'+fecha);
    // return this.http.get('http://palancar.izt.uam.mx:4005/traficoDenso/');
    //return this.http.get(this.URL_API+'/traficoDenso2020/'+fecha));
  }

  getclima( fecha : string ){
    if(fecha.substring(0,4) == "2021")
      return this.http.get(this.URL_API+'/clima2021/'+fecha);
      //return this.http.get('http://palancar.izt.uam.mx:4005/clima/');

    //return this.http.get(this.URL_API+'/clima2020/'+fecha);
  }

  getContaminacion( fecha : string ){
      return this.http.get(this.URL_API+'/contaminacion2020/'+fecha);
    // return this.http.get('http://palancar.izt.uam.mx:4005/traficoDenso/');
    //return this.http.get(this.URL_API+'/traficoDenso2020/'+fecha));
  }

  getEstaciones(){
    return this.http.get(this.URL_API+'/estaciones');
    // return this.http.get('http://palancar.izt.uam.mx:4005/traficoDenso/');
    //return this.http.get(this.URL_API+'/traficoDenso2020/'+fecha));
  }
  
}
