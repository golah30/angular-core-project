import { Injectable } from "@angular/core";
import { Article } from "../../interfaces";
import { ApiService } from "../api/api.service";
import { map } from "rxjs/operators";
const headers = {
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAxMDBmZDExNjljYTI4NWU0YWEwZWQiLCJpYXQiOjE1NjAzNDY5Nzl9.aE-7edVHUMzLjgAgyWTB7UPL3CId2NLb1xJ4dOSVR9c"
};
interface Posts {
    offset: number;
    page: number;
    posts: Array<any>;
    total: number;
}
@Injectable()
export class WorkshopsService {
    constructor(private api: ApiService) {}
    posts: Array<Article> = [];
    filter: string = "";
    public getPosts(page: number, filter: Array<any> | null = []) {
        let url = `/posts?page=${page}`;
        if (filter && filter.length) {
            url += "&tags=";
            filter.forEach((t, i) => {
                url = i !== filter.length - 1 ? `${url}${t}|` : `${url}${t}`;
            });
        }
        return this.api.get(url, headers).pipe(
            map((data: Posts) => {
                this.posts = data.posts;
                return this.posts;
            })
        );
    }
    public getPostById(id: string) {
        return this.api.get(`/posts/${id}`, headers).pipe(
            map((data: Article) => {
                if (data.id === id) {
                    return data;
                } else {
                    return { error: true };
                }
            })
        );
    }
    public getFavorite(page: number, filter: Array<any> | null = []) {
        let url = `/posts?page=${page}`;
        if (filter && filter.length) {
            url += "&";
            filter.forEach((t, i) => {
                url =
                    i !== filter.length - 1
                        ? `${url}${t.seq}|`
                        : `${url}${t.seq}`;
            });
        }
        return this.api.get(`/posts?page=${page}`, headers).pipe(
            map((data: Posts) => {
                this.posts = data.posts;
                return this.posts;
            })
        );
    }
    public getUserPosts(page: number, filter: Array<any> | null = []) {
        let url = `/posts?page=${page}`;
        if (filter && filter.length) {
            url += "&";
            filter.forEach((t, i) => {
                url =
                    i !== filter.length - 1
                        ? `${url}${t.seq}|`
                        : `${url}${t.seq}`;
            });
        }
        return this.api.get(`/posts?page=${page}`, headers).pipe(
            map((data: Posts) => {
                this.posts = data.posts;
                return this.posts;
            })
        );
    }
    public createPost(post: Article) {
        return this.api.post(`/posts`, post, headers);
    }
    public updatePost(post: Article) {
        return this.api.put(`/posts/${post.id}`, post, headers);
    }
    public deletePost(id: string) {
        return this.api.delete(`/posts/${id}`, headers);
    }
}
