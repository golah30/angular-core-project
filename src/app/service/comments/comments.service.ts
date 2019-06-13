import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Comment } from "../../interfaces";

const headers = {
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAxMDBmZDExNjljYTI4NWU0YWEwZWQiLCJpYXQiOjE1NjAzNDY5Nzl9.aE-7edVHUMzLjgAgyWTB7UPL3CId2NLb1xJ4dOSVR9c"
};
@Injectable({
    providedIn: "root"
})
export class CommentsService {
    constructor(private api: ApiService) {}
    public getCommentsByPostId(id: string) {
        return this.api.get(`/comments/${id}`, headers);
    }
    public createComment(id: string, comment: Comment) {
        return this.api.post(`/comments/${id}`, comment, headers);
    }
    public updateComment(postId: string, commentId: string, comment: Comment) {
        return this.api.put(
            `/comments/${postId}/${commentId}`,
            comment,
            headers
        );
    }
    public deleteComment(postId: string, commentId: string) {
        return this.api.delete(`/comments/${postId}/${commentId}`, headers);
    }
}
