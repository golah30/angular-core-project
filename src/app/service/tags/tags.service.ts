import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Tag } from "../../interfaces";
import { ApiService } from "../api/api.service";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class TagsService {
    constructor(private api: ApiService) {}
    tags: Array<Tag> = [];
    public getTags() {
        if (this.tags.length !== 0) {
            return of(this.tags);
        }
        return this.api
            .get(
                `/tags/all`,
                new HttpHeaders({
                    "Content-Type": " application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAxMDBmZDExNjljYTI4NWU0YWEwZWQiLCJpYXQiOjE1NjAzNDY5Nzl9.aE-7edVHUMzLjgAgyWTB7UPL3CId2NLb1xJ4dOSVR9c"
                })
            )
            .pipe(
                map((data: Array<any>) => {
                    this.tags = data;
                    return this.tags;
                })
            );
    }
}
