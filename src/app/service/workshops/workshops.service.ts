import { Injectable } from "@angular/core";
import { TAGS, ARTICLES } from "../../../data";
import { Observable, of } from "rxjs";

@Injectable()
export class WorkshopsService {
    constructor() {}
    private workshops = {
        articles: ARTICLES,
        tags: TAGS
    };
    public getWorkshops(id: string): Observable<any> {
        if (id) {
            return of(this.workshops.articles.filter(e => e.id === id)[0]);
        } else {
            return of(this.workshops);
        }
    }
}
