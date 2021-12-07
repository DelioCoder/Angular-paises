import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais-interface';

import { PaisService } from '../../services/pais.service';
@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
  pais! : Country;
  badges: string[] = []; 
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ codigoPais }) => this.paisService.getPaisPorAlpha( codigoPais ) ),
        tap( console.log )  
      )
      .subscribe({
        next: (pais) => {
          this.pais = pais[0];
          const { translations } = this.pais;
          const elementos = Object.values(translations);

          for (let index = 0; index < elementos.length; index++) {
            this.badges.push(elementos[index].common);
          }
        }
      })
    // this.activatedRoute.params.subscribe({
    //   next: ({ codigoPais }) => {
    //     console.log(codigoPais);
    //     this.paisService.getPaisPorAlpha(codigoPais).subscribe({
    //       next: (pais) => {
    //         console.log(pais);
    //       },
    //     });
    //   },
    // });

  }
}
