import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaIncidenciasComponent } from './components/mapa-incidencias/mapa-incidencias.component';
import { MapaTraficoComponent } from './components/mapa-trafico/mapa-trafico.component';
import { MapaTraficoDensoComponent } from './components/mapa-trafico-denso/mapa-trafico-denso.component';
import { MapasSemaforosCallesCerradasComponent } from './components/mapas-semaforos-calles-cerradas/mapas-semaforos-calles-cerradas.component';
import { MapaCallesReportadasComponent } from './components/mapa-calles-reportadas/mapa-calles-reportadas.component';
import { MapaDivisionAlcaldiasComponent } from './components/mapa-division-alcaldias/mapa-division-alcaldias.component';
import { PageMapcrComponent } from './pages/page-mapcr/page-mapcr.component';
import { PageMapsComponent } from './pages/page-maps/page-maps.component';
import { PageMaptdComponent } from './pages/page-maptd/page-maptd.component';
import { PageMapalComponent } from './pages/page-mapal/page-mapal.component';




@NgModule({
  declarations: [
    PageMapcrComponent,
    MapaIncidenciasComponent, 
    MapaTraficoComponent, 
    MapaTraficoDensoComponent, 
    MapasSemaforosCallesCerradasComponent, 
    MapaCallesReportadasComponent, 
    MapaDivisionAlcaldiasComponent, 
    PageMapsComponent, 
    PageMaptdComponent, PageMapalComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
