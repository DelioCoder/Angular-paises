import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
})
export class PorRegionComponent {

  paises: Country[] = [];
  hayError: boolean = false;
  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';

  constructor( private paisService: PaisService ) { }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary mx-1 my-1' : 'btn btn-outline-primary mx-1 my-1'
  }

  activarRegion( region: string ) {

    if( region === this.regionActiva ) { return; }

    this.regionActiva = region;
    this.hayError = false;
    this.paises = [];

    //TODO: hacer el llamado al servicio
    this.paisService.buscarRegion( region )
      .subscribe({
        next: ( paises ) => {
          console.log( paises );
          if(paises.length == undefined) {
            this.hayError = true;
          }
          this.paises = paises;
        },
        error: ( err ) => {
          this.hayError = true;
          this.paises = [];
        }
      })
  }

}
