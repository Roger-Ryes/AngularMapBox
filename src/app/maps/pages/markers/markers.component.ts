import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
   .mapContainer {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
  `]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('mapMarker') mapMarker!: ElementRef;
  center: [number, number] = [-78.48124797222665, -0.17664900227245092];


  constructor() { }
  ngAfterViewInit(): void {
        const map = new mapboxgl.Map({
        container: this.mapMarker.nativeElement,
        style: 'mapbox://styles/mapbox/light-v10',
        center: this.center,
        zoom: 3
      });
  
      const marker = new mapboxgl.Marker({
        color: "#333",
        draggable: true
      })
      .setLngLat(this.center)
      .addTo(map);
  }

}
