import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { map } from "rxjs/operators";
import { User } from "../../interfaces";
const headers = {
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAxMDBmZDExNjljYTI4NWU0YWEwZWQiLCJpYXQiOjE1NjAzNDY5Nzl9.aE-7edVHUMzLjgAgyWTB7UPL3CId2NLb1xJ4dOSVR9c"
};
@Injectable({
    providedIn: "root"
})
export class UserService {
    private auth: boolean = true;
    private User: User;
    constructor(private api: ApiService) {}
    public getUserById(id: string) {
        return this.api.get(`/users/${id}`, headers);
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
                    this.User = data;
                    return this.User;
                })
            );
    }
    public createUser(user: User) {
        return this.api.post(`/users`, user, headers);
    }
    public getAllUsers() {
        return this.api.get(`/users`, headers);
    }
    public getCurrentUser() {
        return this.api.get(`/users/current`, headers).pipe(
            map((data: User) => {
                this.User = data;
                return this.User;
            })
        );
    }
    public updateUserById(user: User) {
        return this.api.put(`/users/${user._id}`, user, headers).pipe(
            map((data: User) => {
                if (data._id === this.User._id) {
                    this.User = data;
                }
                return data;
            })
        );
    }
    public deleteUser(id: string) {
        return this.api.delete(`/users/${id}`, headers);
    }
    public isAuth() {
        return this.auth;
    }
}
