import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais-interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/name/${ termino }`;

    return this.http.get<Country[]>( url );

  }

  buscarCapital( termino: string ): Observable<Country[]> {
    
    const url = `${ this.apiUrl }/capital/${ termino }`;

    return this.http.get<Country[]>( url );

  }

  getPaisPorAlpha( id: string ): Observable<Country> {
    
    const url = `${ this.apiUrl }/alpha/${ id }`;
    
    return this.http.get<Country>( url );
  
  }

  buscarRegion( region: string ): Observable<Country[]> {

    // const params = new HttpParams()
    //   .set('fields', 'name, capital, flag, population')

    const url = `${ this.apiUrl }/region/${ region }`;

    return this.http.get<Country[]>( url )
      .pipe(
        tap(console.log)
      );

  }

}
