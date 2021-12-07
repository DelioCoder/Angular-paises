import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer
    }
    `
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];

  paisesSugeridos     : Country[] = [];
  mostrarSugerencias  : boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: (paises) => {
          console.log(paises);
          if(paises.length == undefined){
            this.hayError = true;
          }
          this.paises = paises;
        },
        error: (err) =>{
          this.hayError = true;
          this.paises   = [];
        }
      })
  }

  sugerencias( termino: string ) {
    
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: ((paises) => this.paisesSugeridos = paises.splice(0, 5) ),
        error: (err) => {}
      })

  }

  buscarSugerido( termino: string ) {

    this.buscar( termino );
    

  }

}
