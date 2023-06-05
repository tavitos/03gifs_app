import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey:       string = '3y1SZ2oqrOYyTRk2vqburJo5wYd1aAMJ';
    private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

    constructor( private http: HttpClient) { /** Inyección del servicio HttpClient suministrado por HttpClientModule importado en app.module.ts */
        this.loadLocalStorage();
        console.log('Gifs Service Ready');
        
     } 

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory( tag: string){
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    // Ejemplo con fetch

    // async searchTag( tag: string):Promise<void>  {
    //     if( tag.length === 0) return;
    //     this.organizeHistory(tag);
    //     // console.log(this.tagsHistory);

    //     // fetch('https://api.giphy.com/v1/gifs/search?api_key=3y1SZ2oqrOYyTRk2vqburJo5wYd1aAMJ&q=valorant&limit=10')
    //     //     .then( resp => resp.json())
    //     //     .then( data => console.log(data));

    //     // Abajo es lo mismo con await
    //     // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=3y1SZ2oqrOYyTRk2vqburJo5wYd1aAMJ&q=valorant&limit=10')
    //     // const data = await resp.json();
    //     // console.log(data);
        
    // }

    saveLocalStorage():void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory) );
    }
    
    private loadLocalStorage():void {
        if( !localStorage.getItem('history') ) return;
        this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
        // console.log(this._tagsHistory);
        if(this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag( tag: string ):void  {
        if( tag.length === 0) return;
        this.organizeHistory(tag);
        // console.log(this.tagsHistory);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)

        // Con HttpClient
        // this.http.get(`${ this.serviceUrl }/search?api_key=3y1SZ2oqrOYyTRk2vqburJo5wYd1aAMJ&q=valorant&limit=10`)
        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params }) /** tendría que ser { params: params} pero como tiene el mismo nombre nada mas se deja params */
            .subscribe( resp => {
                // console.log( resp.data );
                this.gifList = resp.data;
                // console.log({gifs: this.gifList});
                
            });
        
    }
    
}