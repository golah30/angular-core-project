import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "../api/api.service";
import { UserService } from "../user/user.service";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class QuizzesService {
    constructor(private api: ApiService, private UserService: UserService) {}

    public getQuizzes(params): Observable<any> {
        let url = "/quizzes?";
        for (let param in params) {
            url += `${param}=${params[param]}`;
        }
        return this.api
            .get(url, {
                Authorization: this.UserService.getToken()
            })
            .pipe(map((data: any) => data.quizzes));
    }
    public getQuizById(id: string): Observable<any> {
        let url = `/quizzes/${id}`;
        return this.api
            .get(url, { Authorization: this.UserService.getToken() })
            .pipe(
                map((data: any) => {
                    return data[0];
                })
            );
    }
    public validateResult(id: string, answers: any) {
        let url = `/quizzes/validate/${id}`;
        return this.api
            .post(
                url,
                { formData: answers },
                { Authorization: this.UserService.getToken() }
            )
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }
    createQuizz(config: any) {
        let url = "/quizzes";
        return this.api
            .post(url, config, { Authorization: this.UserService.getToken() })
            .pipe(
                map(data => {
                    return data;
                })
            );
    }
    deleteQuizz(id: string) {
        let url = `/quizzes/${id}`;
        return this.api
            .delete(url, {
                Authorization: this.UserService.getToken()
            })
            .pipe(
                map(data => {
                    return data;
                })
            );
    }
}
