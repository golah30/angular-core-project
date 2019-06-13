import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    constructor(private http: HttpClient) {}
    private contentType = { "Content-Type": " application/json" };
    private apiRoot: string = "https://internship.zazmic.com";

    get(path: string, headers: object = {}) {
        console.log("GET " + path);
        const httpOptions = {
            headers: new HttpHeaders({ ...headers, ...this.contentType })
        };
        let url = this.apiRoot + path;
        return this.http.get(url, httpOptions);
    }

    post(path: string, data: any, headers: object = {}) {
        console.log("POST " + path);
        const httpOptions = {
            headers: new HttpHeaders({ ...headers, ...this.contentType })
        };
        let url = this.apiRoot + path;
        return this.http.post(url, data, httpOptions);
    }

    put(path: string, data: any, headers: object = {}) {
        console.log("PUT " + path);

        const httpOptions = {
            headers: new HttpHeaders({ ...headers, ...this.contentType })
        };
        let url = this.apiRoot + path;
        return this.http.put(url, data, httpOptions);
    }

    delete(path: string, headers: object = {}) {
        console.log("DELETE " + path);

        const httpOptions = {
            headers: new HttpHeaders({ ...headers, ...this.contentType })
        };
        let url = this.apiRoot + path;
        return this.http.delete(url, httpOptions);
    }
}
