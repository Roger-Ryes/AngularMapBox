import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoon-range',
  templateUrl: './zoon-range.component.html',
  styles: [`
    .mapContainer{ height:100%; width:100% }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      
      position: fixed;
      z-index:999;
    }
  `]
})
export class ZoonRangeComponent implements AfterViewInit {

  @ViewChild("mapZoom") divMap!: ElementRef;
  private mapZoom!: mapboxgl.Map;

  constructor() { }

  ngAfterViewInit(): void {
    // console.log("onInit: ",this.divMap);
    this.mapZoom = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.48124797222665, -0.17664900227245092],
      zoom: 18
    });
  }
  
  zoomOut(){
    this.mapZoom.zoomOut();
  }

  zoomIn(){
    this.mapZoom.zoomIn();
  }
}