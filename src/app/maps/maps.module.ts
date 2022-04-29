import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MinMapComponent } from './components/min-map/min-map.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoonRangeComponent } from './pages/zoon-range/zoon-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    MinMapComponent,
    FullScreenComponent,
    MarkersComponent,
    ZoonRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
