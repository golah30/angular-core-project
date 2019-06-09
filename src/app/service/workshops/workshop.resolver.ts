import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

import { WorkshopsService } from "./workshops.service";
@Injectable()
export class WorkshopResolver implements Resolve<Observable<any>> {
    constructor(private workshopsService: WorkshopsService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.workshopsService.getWorkshopById(route.params.id);
    }
}
