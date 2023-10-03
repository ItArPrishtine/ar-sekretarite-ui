export type Book = {
    id: string;
    title: string;
    category: string;
    author: Author;
    author_data: Author; // only on search
    borrowed_books: BorrowedBooks[];
}

export type Author = {
    id: string;
    name: string;
}

export type BorrowedBooks = {
    id: string;
    borrowed_date: string;
    date_to_return: string;
    returned: boolean;
    users_permissions_user: 3;
}