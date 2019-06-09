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
    public getWorkshops(): Observable<any> {
        return of(this.workshops);
    }
    public getWorkshopById(id: string): Observable<any> {
        let workshop = this.workshops.articles.filter(e => e.id === id)[0];
        if (workshop) {
            return of(this.workshops.articles.filter(e => e.id === id)[0]);
        } else {
            return of({ error: true });
        }
    }
}
