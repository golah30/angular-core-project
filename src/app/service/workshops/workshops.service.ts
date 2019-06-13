import { Injectable } from "@angular/core";
import { Article } from "../../interfaces";
import { ApiService } from "../api/api.service";
import { map } from "rxjs/operators";
import { UserService } from "../user/user.service";
import { of } from "rxjs";

interface Posts {
    offset: number;
    page: number;
    posts: Array<any>;
    total: number;
}
@Injectable()
export class WorkshopsService {
    constructor(private api: ApiService, private UserService: UserService) {}
    posts: Array<Article> = [];
    lastPostById: Article;
    filter: string = "";
    public getPosts(page: number, filter: Array<any> | null = []) {
        let url = `/posts?page=${page}`;
        if (filter && filter.length) {
            url += "&tags=";
            filter.forEach((t, i) => {
                url = i !== filter.length - 1 ? `${url}${t}|` : `${url}${t}`;
            });
        }
        return this.api
            .get(url, { Authorization: this.UserService.getToken() })
            .pipe(
                map((data: Posts) => {
                    this.posts = data.posts;
                    return this.posts;
                })
            );
    }
    public getCurrentPost() {
        return this.lastPostById;
    }
    public getPostById(id: string) {
        return this.api
            .get(`/posts/${id}`, { Authorization: this.UserService.getToken() })
            .pipe(
                map((data: Article) => {
                    if (data.id === id) {
                        this.lastPostById = data;
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
        return this.api
            .get(url, {
                Authorization: this.UserService.getToken()
            })
            .pipe(
                map((data: Posts) => {
                    this.posts = data.posts;
                    return this.posts;
                })
            );
    }
    public getUserPosts(page: number, filter: Array<any> | null = [], author) {
        let url = `/posts?page=${page}&authorId=${author}`;
        if (filter && filter.length) {
            url += "&";
            filter.forEach((t, i) => {
                url =
                    i !== filter.length - 1
                        ? `${url}${t.seq}|`
                        : `${url}${t.seq}`;
            });
        }
        return this.api
            .get(url, {
                Authorization: this.UserService.getToken()
            })
            .pipe(
                map((data: Posts) => {
                    this.posts = data.posts;
                    return this.posts;
                })
            );
    }
    public createPost(post: Article) {
        return this.api.post(`/posts`, post, {
            Authorization: this.UserService.getToken()
        });
    }
    public updatePost(post: Article) {
        return this.api.put(`/posts/${post.id}`, post, {
            Authorization: this.UserService.getToken()
        });
    }
    public deletePost(id: string) {
        return this.api.delete(`/posts/${id}`, {
            Authorization: this.UserService.getToken()
        });
    }
}
