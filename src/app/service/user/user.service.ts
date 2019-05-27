import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private auth: boolean = true;

    constructor() {}

    public isAuth() {
        return this.auth;
    }
}
