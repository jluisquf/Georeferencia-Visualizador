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
import { PageMapainComponent } from './pages/page-mapain/page-mapain.component';
import { PageMapcrUComponent } from './pages/page-mapcr-u/page-mapcr-u.component';
import { MapaCallesReportadasUsuariosComponent } from './components/mapa-calles-reportadas-usuarios/mapa-calles-reportadas-usuarios.component';
import { PageMaptComponent } from './pages/page-mapt/page-mapt.component';
import { MapaclimaComponent } from './components/mapaclima/mapaclima.component';
import { PageMapcliComponent } from './pages/page-mapcli/page-mapcli.component';
import { MapaTraficoClimaComponent } from './components/mapa-trafico-clima/mapa-trafico-clima.component';
import { PageMaptrafyclimComponent } from './pages/page-maptrafyclim/page-maptrafyclim.component';
import { MapaContaminacionComponent } from './components/mapa-contaminacion/mapa-contaminacion.component';
import { PageMapcontaComponent } from './pages/page-mapconta/page-mapconta.component';


@NgModule({
  declarations: [
    PageMapcrComponent,
    PageMapcrUComponent,
    MapaIncidenciasComponent, 
    MapaTraficoComponent, 
    MapaTraficoDensoComponent, 
    MapasSemaforosCallesCerradasComponent, 
    MapaCallesReportadasComponent, 
    MapaDivisionAlcaldiasComponent, 
    PageMapsComponent, 
    PageMaptdComponent, 
    PageMapalComponent, 
    PageMapainComponent, 
    MapaCallesReportadasUsuariosComponent, 
    PageMaptComponent, 
    MapaclimaComponent, 
    PageMapcliComponent, 
    MapaTraficoClimaComponent,
    PageMaptrafyclimComponent,
    MapaContaminacionComponent,
    PageMapcontaComponent,
    
  ],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
