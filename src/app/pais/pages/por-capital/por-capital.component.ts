import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {

  hayError: boolean = false;
  termino : string = '';
  paises  : Country[] = [];

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( termino ).subscribe({
      next: (paises) => {
        console.log(paises);
        if(paises.length == undefined) {
          this.hayError = true;
        }
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      }
    })

  }

  sugerencias( event: any ) {
    this.hayError = false;
  }

}
