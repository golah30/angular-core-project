import { FormGroup } from "@angular/forms";

export interface Field {
    group: FormGroup;
    config: any;
}

export interface Tag {
    _author: string;
    seq: number;
    name: string;
    createdAt: string;
}

export interface Article {
    id: string;
    title: string;
    isFavorite: boolean;
    isLike: boolean;
    likes: number;
    stars: number;
    tags: Array<number>;
    description: string;
    text: string;
    image: string;
    createdAt: string;
    author: string;
}
export interface Comment {
    createdAt?: string;
    updatedAt?: string;
    user?: User;
    _author?: string;
    id?: string;
    text: string;
}
export interface User {
    picture: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    username: string;
    posts?: Array<string>;
    _id?: string;
    token?: string;
}
export interface MenuItem {
    icon: string;
    href: string;
    title: string;
}
