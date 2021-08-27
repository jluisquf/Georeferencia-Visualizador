import{ RouterModule, Routes} from '@angular/router';
import { PageMapComponent } from './map/pages/page-map/page-map.component';
import { PageChartComponent } from './chart/pages/page-chart/page-chart.component';
import { PageMapcrComponent } from './map/pages/page-mapcr/page-mapcr.component';
import { PageMapsComponent } from './map/pages/page-maps/page-maps.component';
import { PageMaptdComponent } from './map/pages/page-maptd/page-maptd.component';
import { PageMapalComponent } from './map/pages/page-mapal/page-mapal.component';
import { HomeComponent } from './shared/pages/home/home.component';



//arreglo de rutas 
const APP_ROUTES:Routes=[

    {path: 'home', component:HomeComponent},
    {path: 'graficas', component:PageChartComponent},
    {path: 'mapatraficod', component:PageMaptdComponent},
    {path: 'mapaalcaldias', component:PageMapalComponent},
    {path: 'mapacallesrep',component:PageMapcrComponent},
    {path: 'mapasemaforos',component:PageMapsComponent},
    {path: '**', pathMatch:'full', redirectTo:'home'}
   
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);