import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor(private http: HttpClient) {}
    login: string = "kda@example.com";
    password: string = "12345";
    token: string =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAxMDBmZDExNjljYTI4NWU0YWEwZWQiLCJpYXQiOjE1NjAzNDY5Nzl9.aE-7edVHUMzLjgAgyWTB7UPL3CId2NLb1xJ4dOSVR9c";
    utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    apiRoot: string = "https://internship.zazmic.com";
    get(path: string, headers: HttpHeaders) {
        console.log("GET " + path);
        const httpOptions = {
            headers
        };
        let url = this.apiRoot + path;
        return this.http.get(url, httpOptions);
    }
    post(path: string, data: any, headers: HttpHeaders) {
        console.log("POST " + path);
        const httpOptions = {
            headers
        };
        let url = this.apiRoot + path;
        return this.http.post(url, data, httpOptions);
    }
    put(path: string, data: any, headers: HttpHeaders) {
        console.log("PUT " + path);

        const httpOptions = {
            headers
        };
        let url = this.apiRoot + path;
        return this.http.put(url, data, httpOptions);
    }
    delete(path: string, headers: HttpHeaders) {
        console.log("DELETE " + path);

        const httpOptions = {
            headers
        };
        let url = this.apiRoot + path;
        return this.http.delete(url, httpOptions);
    }
}

// const httpOptions = {
//     headers: new HttpHeaders({
//         "Content-Type": " application/json",
//         Authorization:
//             "Basic " +
//             this.utf8_to_b64(`${this.login}:${this.password}`)
//     })
// };
