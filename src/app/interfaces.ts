export interface Tag {
    name: string;
    isActive: boolean;
}
export interface Article {
    id: string;
    title: string;
    isFavorite: boolean;
    tags: Array<string>;
    description: string;
    content: string;
    image: string;
    date: Date;
    author: string;
}
export interface Comment {
    id: string;
    username: string;
    text: string;
    date: Date;
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
