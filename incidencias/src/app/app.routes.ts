import{ RouterModule, Routes} from '@angular/router';
import { PageChartComponent } from './chart/pages/page-chart/page-chart.component';
import { PageMapcrComponent } from './map/pages/page-mapcr/page-mapcr.component';
import { PageMapsComponent } from './map/pages/page-maps/page-maps.component';
import { PageMaptdComponent } from './map/pages/page-maptd/page-maptd.component';
import { PageMapalComponent } from './map/pages/page-mapal/page-mapal.component';
import { PageMapainComponent } from './map/pages/page-mapain/page-mapain.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { PageMapcrUComponent } from './map/pages/page-mapcr-u/page-mapcr-u.component';
import { PageMaptComponent } from './map/pages/page-mapt/page-mapt.component';
import { PageMapcliComponent } from './map/pages/page-mapcli/page-mapcli.component';
import { PageMaptrafyclimComponent } from './map/pages/page-maptrafyclim/page-maptrafyclim.component';
import { PageMapcontaComponent } from './map/pages/page-mapconta/page-mapconta.component';

//arreglo de rutas 
const APP_ROUTES:Routes=[

    {path: 'home', component:HomeComponent},
    {path: 'graficas', component:PageChartComponent},
    {path: 'mapatraficin', component:PageMapainComponent},
    {path: 'mapatraficod', component:PageMaptdComponent},
    {path: 'mapaalcaldias', component:PageMapalComponent},
    {path: 'mapacallesrep',component:PageMapcrComponent},
    {path: 'mapasemaforos',component:PageMapsComponent},
    {path: 'mapaccrepususer',component:PageMapcrUComponent},
    {path: 'mapatrafico',component:PageMaptComponent},
    {path: 'mapaclima',component:PageMapcliComponent},
    {path: 'mapatraficoyclima',component:PageMaptrafyclimComponent},
    {path: 'mapacontaminacion',component:PageMapcontaComponent},
    {path: '**', pathMatch:'full', redirectTo:'home'}

];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES, {useHash:true});