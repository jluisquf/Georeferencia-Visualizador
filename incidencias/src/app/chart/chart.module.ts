import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageChartComponent } from './pages/page-chart/page-chart.component';
import { IncidenciasCdmxComponent } from './components/incidencias-cdmx/incidencias-cdmx.component';
import { ChartsModule } from "ng2-charts";


@NgModule({
  declarations: [
    PageChartComponent, 
    IncidenciasCdmxComponent
  ],
  imports: [
    ChartsModule,
    CommonModule
  ]
})
export class ChartModule { }
