import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { map } from "rxjs/operators";
import { User } from "../../interfaces";
import { of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private auth: boolean = false;
    private token: string = "";
    private User: User;
    constructor(private api: ApiService) {}
    public getToken() {
        return "Bearer " + this.token;
    }
    public getUserById(id: string) {
        return this.api.get(`/users/${id}`, { Authorization: this.getToken() });
    }
    public signUp(login: string, password: string) {
        return this.api.post(`/users/signup`, { username: login, password });
    }
    public login(login: string, password: string) {
        return this.api
            .get(`/users/login`, {
                Authorization: `Basic ${window.btoa(
                    unescape(encodeURIComponent(login + ":" + password))
                )}`
            })
            .pipe(
                map((data: User) => {
                    this.auth = true;
                    this.User = data;
                    this.token = data.token;
                    return this.User;
                })
            );
    }
    public createUser(user: User) {
        return this.api.post(`/users`, user, {
            Authorization: this.getToken()
        });
    }
    public getAllUsers() {
        return this.api.get(`/users`, { Authorization: this.getToken() });
    }
    public getCurrentUser() {
        if (this.User) {
            return of(this.User);
        }
        return this.api
            .get(`/users/current`, { Authorization: this.getToken() })
            .pipe(
                map((data: User) => {
                    this.User = data;
                    return this.User;
                })
            );
    }
    public updateUserById(id: string, payload: any) {
        return this.api
            .put(`/users/${id}`, payload, { Authorization: this.getToken() })
            .pipe(
                map((data: User) => {
                    if (data._id === this.User._id) {
                        this.User = data;
                    }
                    return data;
                })
            );
    }
    public deleteUser(id: string) {
        return this.api.delete(`/users/${id}`, {
            Authorization: this.getToken()
        });
    }
    public isAuth() {
        return this.auth;
    }
}
