export type Book = {
    id: string;
    title: string;
    category: string;
    author: Author;
}

export type Author = {
    id: string;
    name: string;
}