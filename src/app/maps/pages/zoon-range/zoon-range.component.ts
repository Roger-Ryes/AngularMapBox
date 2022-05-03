import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
      width: 400px;

      position: fixed;
      z-index:999;
    }
  `]
})
export class ZoonRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild("mapZoom") divMap!: ElementRef;
  private mapZoom!: mapboxgl.Map;
  zoomLevel: number=10;
  center: [number, number] = [-78.48124797222665, -0.17664900227245092];


  constructor() { }
  ngOnDestroy(): void {
    this.mapZoom.off("zoom", ()=>{}); 
    this.mapZoom.off("zoomend", ()=>{}); 
    this.mapZoom.off("move", ()=>{}); 
  }

  ngAfterViewInit(): void {
    this.mapZoom = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    // Detecta cualquie cambios en el zoom
    this.mapZoom.on("zoom", (evn)=>{
     this.zoomLevel = this.mapZoom.getZoom();
   }); 
    // Detecta cualquie cambios en el zoom y determina el maximo
   this.mapZoom.on("zoomend", (evn)=>{
     if(this.mapZoom.getZoom()>= 18){
       this.mapZoom.zoomTo(18);
     }
   }); 
    // Detecta cualquie cambios en el mapa
    this.mapZoom.on("move", (even)=>{
      const target = even.target;
      const {lng, lat} = target.getCenter(); 
      this.center = [lng, lat];
    });


   
  }

  // zoomLevel get(){
  //   return map.getZoom();
  // }
  
  zoomOut(){
    this.mapZoom.zoomOut();
  }

  zoomIn(){
    this.mapZoom.zoomIn();
  }

  zoomRangeChange( value: string ){
    this.mapZoom.zoomTo(Number(value));
  }
}