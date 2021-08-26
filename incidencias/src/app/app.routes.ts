import{ RouterModule, Routes} from '@angular/router';
// import{ MapComponent} from './components/map/map.component';
// import { ChartComponent } from "./components/chart/chart.component";

import { PageMapComponent } from './map/pages/page-map/page-map.component';
import { PageChartComponent } from './chart/pages/page-chart/page-chart.component';
import { PageMapcrComponent } from './map/pages/page-mapcr/page-mapcr.component';
import { PageMapsComponent } from './map/pages/page-maps/page-maps.component';


//arreglo de rutas 
const APP_ROUTES:Routes=[

    {path: 'mapas', component:PageMapComponent},
    {path: 'graficas', component:PageChartComponent},
    {path: 'mapacallesrep',component:PageMapcrComponent},/*agergado Fer&sus*/
    {path: 'mapasemaforos',component:PageMapsComponent},
    {path: '**', pathMatch:'full', redirectTo:'mapas'}
   
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);