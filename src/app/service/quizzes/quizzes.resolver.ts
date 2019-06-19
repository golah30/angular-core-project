import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { QuizzesService } from "./quizzes.service";

@Injectable()
export class QuizzesResolver implements Resolve<Observable<any>> {
    constructor(private QuizzesService: QuizzesService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.QuizzesService.getQuizzes();
    }
}
