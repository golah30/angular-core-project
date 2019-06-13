import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Comment } from "../../interfaces";
import { UserService } from "../user/user.service";

@Injectable()
export class CommentsService {
    constructor(private api: ApiService, private UserService: UserService) {}
    public getCommentsByPostId(id: string) {
        return this.api.get(`/comments/${id}`, {
            Authorization: this.UserService.getToken()
        });
    }
    public createComment(id: string, comment: Comment) {
        return this.api.post(`/comments/${id}`, comment, {
            Authorization: this.UserService.getToken()
        });
    }
    public updateComment(postId: string, commentId: string, comment: Comment) {
        return this.api.put(`/comments/${postId}/${commentId}`, comment, {
            Authorization: this.UserService.getToken()
        });
    }
    public deleteComment(postId: string, commentId: string) {
        return this.api.delete(`/comments/${postId}/${commentId}`, {
            Authorization: this.UserService.getToken()
        });
    }
}
