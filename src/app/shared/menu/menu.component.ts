import { Component } from '@angular/core';

interface MenuItem{
  path: string,
  name: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    li{ cursor: pointer }
  `]
})
export class MenuComponent {
  menuItems: MenuItem[]=[
    {
      path: '/maps/fullscreen',
      name: 'FullScreen'
    },
    {
      path: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      path: '/maps/marcadores',
      name: 'Marcadores'
    },
    {
      path: '/maps/propiedades',
      name: 'Propiedades'
    },
  ]

}
