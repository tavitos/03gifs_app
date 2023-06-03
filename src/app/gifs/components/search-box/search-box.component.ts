import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <!-- <input type="text"         Ejemplo sin ViewChild
            class="form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag(txtTagInput.value)"
            #txtTagInput
        > -->

        <!-- Ejemplo con ViewChild -->
        <input type="text"
            class="form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag()"
            #txtTagInput
        >
    `
})

export class SearchBoxComponent {

    @ViewChild('txtTagInput') /** El ViewChild sirve para tomar una referencia local del template */
    tagInput!: ElementRef<HTMLInputElement> /** ! notNull operator, aseguramos a typeScript que siempre va a tener un valor */

    constructor( private gifsService: GifsService) { }

    // searchTag( newTag: string){ Ejemplo sin ViewChild()
    searchTag(){
        // console.log({newTag}); Ejemplo sin ViewChild()
        const newTag = this.tagInput.nativeElement.value;
        // console.log({newTag});
        this.gifsService.searchTag(newTag);
        this.tagInput.nativeElement.value = '';
    }

}