# MapsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Enlaces a usar

- Angular
https://getbootstrap.com/docs/5.1/getting-started/introduction/

- Mapbox
https://account.mapbox.com/access-tokens

# AngularMapBox
## Mapboxgl
Import en TS

    import * as mapboxgl from 'mapbox-gl';


    ngOnInit(): void {
        (mapboxgl as any).accessToken = environment.mapboxToken;  

        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-78.48124797222665, -0.17664900227245092],
        zoom: 18
    });

En el archivo html

    <div id="map"></div>

## Mapboxgl con referencia
En el archivo html

    <div #mapZoom class="mapContainer"></div>

En el archivo TS

    // Se usa el lifecycle tipo: "AfterViewInit"
    export class ZoonRangeComponent implements AfterViewInit {

        @ViewChild("mapZoom") divMap!: ElementRef; // Se llama a la referencia
        private mapZoom!: mapboxgl.Map;

        ngAfterViewInit(): void {
            this.mapZoom = new mapboxgl.Map({
            container: this.divMap.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-78.48124797222665, -0.17664900227245092],
            zoom: 18
            });
        }    
    }