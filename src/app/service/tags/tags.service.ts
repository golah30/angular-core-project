import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Tag } from "../../interfaces";
import { ApiService } from "../api/api.service";
import { UserService } from "../user/user.service";
import { map } from "rxjs/operators";

@Injectable()
export class TagsService {
    constructor(private api: ApiService, private UserService: UserService) {}
    tags: Array<Tag> = [];
    public getTags() {
        if (this.tags.length !== 0) {
            return of(this.tags);
        }
        return this.api
            .get(`/tags/all`, { Authorization: this.UserService.getToken() })
            .pipe(
                map((data: Array<any>) => {
                    this.tags = data;
                    return this.tags;
                })
            );
    }
    public createTag(tag: string) {
        return this.api.post(
            `/tags`,
            { name: tag },
            { Authorization: this.UserService.getToken() }
        );
    }
    public deleteTag(id: number) {
        return this.api.delete(`/tags/${id}`, {
            Authorization: this.UserService.getToken()
        });
    }
}
