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
    content: string;
    image: string;
    createdAt: string;
    _author: string;
}
export interface Comment {
    id: string;
    username: string;
    text: string;
    date: Date;
    author: string;
}
export interface User {
    img: string;
    initials: string;
    name: string;
    role: string;
    username: string;
    posts: Array<string>;
    _id: string;
    token: string;
}
export interface MenuItem {
    icon: string;
    href: string;
    title: string;
}
