export interface Tag {
    seq: number;
    name: string;
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
    author: string;
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
}
export interface MenuItem {
    icon: string;
    href: string;
    title: string;
}
