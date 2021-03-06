import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

interface customMarker{
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number, number]
}
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

    .list-group{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;      
    }
    li {
      cursor: pointer;
    }
  `]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('mapMarker') mapMarker!: ElementRef;
  center: [number, number] = [-78.48124797222665, -0.17664900227245092];
  map!: mapboxgl.Map;

  // Arreglo de marcadores
  markers: customMarker[]=[];

  constructor() { }
 
  ngAfterViewInit(): void {
        this.map = new mapboxgl.Map({
        container: this.mapMarker.nativeElement,
        style: 'mapbox://styles/mapbox/light-v10',
        center: this.center,
        zoom: 3
      });
      this.readLocarStorage();
      // const marker = new mapboxgl.Marker({
      //   color: "#333",
      //   draggable: true
      // })
      // .setLngLat(this.center)
      // .addTo(map);
  }

  // Add Marker
  addMarker(){
    // Hexadecimal aleatorio
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      color: color,
      draggable: true
    })
    .setLngLat(this.center)
    .addTo(this.map);
   

    this.markers.push({color, marker: newMarker});
    this.saveMarkerLocalStorage();

    // Detecta cuando se mueve el marcardor y lo guarda en el localstorage
    newMarker.on("dragend", ()=>{
      this.saveMarkerLocalStorage(); 
    })
  }

  // Go to Marker
  goToMarker(mapMark: mapboxgl.Marker){
      this.map.flyTo({
        center: mapMark.getLngLat()
      });
  }

  // Save Marker
  saveMarkerLocalStorage(){
    const markersToSave: customMarker[]=[];
    this.markers.forEach(a=>{
      const color = a.color;
      const {lng, lat} = a.marker!.getLngLat();

      markersToSave.push({ color: color, center: [lng, lat] })
    })
    localStorage.setItem(`Markers`, JSON.stringify(markersToSave));
  }

  // Read Marker
  readLocarStorage(){
    if(!localStorage.getItem("Markers")){
        return;   
    }
    const lngLatArr: customMarker[] =  JSON.parse(localStorage.getItem("Markers")!);
    
    lngLatArr.forEach((element) => {
      const newMarker = new mapboxgl.Marker({
        color: element.color,
        draggable: true
      }).setLngLat([Number(element.center?.[0]), Number(element.center?.[1])])
      .addTo(this.map);
      
      this.markers.push({color: element.color, marker: newMarker});

      // Detecta cuando se mueve el marcardor y lo guarda en el localstorage
      newMarker.on("dragend", ()=>{
        this.saveMarkerLocalStorage(); 
      })
    });
  }

  // Delete marker
  deleteMarker(index: number){
    // Delete of map
    this.markers[index].marker?.remove();
    // Delete of array
    this.markers.splice(index, 1);
    this.saveMarkerLocalStorage();
  }
}
