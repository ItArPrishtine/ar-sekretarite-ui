import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Book, Author } from './../shared/interfaces';
import ContentLoader from "react-content-loader";

import './style.scss';

function Books(props: any) {
    const [bookList, setBookList] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [author, setAuthor] = useState<string>();
    const categories = ['a', 'ar', 'b', 'e.f', 'h', 'k', 'l.h', 'l.sh', 'p', 'k'];
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    function getAuthorsFromBooks(books: Book[]) {
        const authors: Author[] = [];
        console.log(author);

        books.forEach(function(book) {
                if (!authors.map(author => author.id).includes(book.author.id)) {
                    authors.push(book.author);
                }
            }
        );

        setAuthors(authors);
    }

    async function getData() {
        axios.get(`https://ar-sekretarite.herokuapp.com/books?_limit=-1&&_sort=id:ASC`)
            .then(res => {
                setBookList(res.data);
                setFilteredBooks(res.data);
                getAuthorsFromBooks(res.data);
                setLoader(false);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    function getImageUrl(category: string) {
        const cat = category.toLowerCase();

        if (cat.startsWith('f')){
            return '/images/book_images/f.png'
        } else if (cat.startsWith('ar')){
            return '/images/book_images/ar.png'
        } else if (cat.startsWith('a')){
            return '/images/book_images/a.png'
        } else if (cat.startsWith('b')){
            return '/images/book_images/b.png'
        } else if (cat.startsWith('e.f')){
            return '/images/book_images/efs.png'
        } else if (cat.startsWith('h')){
            return '/images/book_images/h.png'
        } else if (cat.startsWith('k')){
            return '/images/book_images/k.png'
        } else if (cat.startsWith('l.h')){
            return '/images/book_images/l.h.png'
        } else if (cat.startsWith('l.sh')){
            return '/images/book_images/l.sh.png'
        } else if (cat.startsWith('p')){
            return '/images/book_images/l.sh.png'
        } else {
            return '/images/book_images/f.png'
        }
    }

    function authorChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setAuthor(event.target.value);
    }

    function categoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value);
    }

    function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function filterBooks() {
        setLoader(true);

        let filters = '';

        if (category) {
            filters+=`&category_contains=${category}`;
        }

        if (title) {
            filters+=`&title_contains=${title}`;
        }

        axios.get(`https://ar-sekretarite.herokuapp.com/books?_limit=-1&_sort=id:ASC${filters}`)
            .then(res => {
                setLoader(false);
                setFilteredBooks(res.data);
            })
    }

    function clearBooks() {
        setLoader(true);
        setFilteredBooks(bookList);
        setCategory('');
        setTitle('');

        setTimeout(() => {
            setLoader(false)
        }, 1000)

    }

    return (
        <div className='container'>
            <div className="filter-bar row">
                <div className='col-md-4'>
                        <label>Titulli i Librit:</label>
                        <input onBlur={(event) => titleChange(event)} className="form-control" id="category" />
                    </div>
                <div className={'col-md-3'}>
                        <label>Kategoria:</label>
                        <select className="form-select" id="title" onChange={(event) => categoryChange(event)}>
                            <option value={''}>Te gjitha</option>
                            {
                                (categories || []).map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                        </select>
                </div>
                <div className={'col-md-3'}>
                        <label>Emri i Autorit:</label>
                        <select className="form-select" id="author" onChange={(event) => authorChange(event)}>
                            <option>Te gjithe</option>
                            {
                                (authors || []).map((element) => {
                                    return (
                                        <option value={element.id} key={element.id}>{element.name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                <div className={'col-md-2 buttons'}>
                    <button onClick={() => filterBooks()} className={'btn btn-primary'}>
                        Filtro
                    </button>
                    <button onClick={() => clearBooks()} className={'btn btn-primary'}>
                        Fshij
                    </button>
                </div>
            </div>
            <div className="book-cards">
                <div className={'content-loaders'}>
                    {
                        [1,2,3,4].map(item => {
                            return ( loader &&
                                <ContentLoader
                                    key={item}
                                    style={{ width: '310px' }}
                                    height={400}
                                    speed={2}
                                    className={'content-loader'}
                                    primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb"
                                    {...props}
                                >
                                    <rect x="0" y="0" width="310" height="280" />
                                    <rect x="0" y="290" width="310" height="10" />
                                    <rect x="0" y="310" width="150" height="10" />
                                    <rect x="0" y="330" width="80" height="10" />
                                </ContentLoader>
                            )
                        })
                    }
                </div>

                {
                    (filteredBooks || []).map((element) => {
                        return ( !loader &&
                            <div key={element.id} className="book-card" data-category="fiction" data-title="1984" data-author="george_orwell">
                                {/*<img src="https://fastly.picsum.photos/id/59/800/600.jpg?hmac=L2eXAA8MFqqxnkN4w-YFltHcmSo-gqwKHlKBNwxq490" alt="Book 1" />*/}

                                <div className={'image'} style={{
                                    backgroundImage: `url("${getImageUrl(element.category)}")`
                                }}>

                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">{element.title}</h4>
                                    <p className="card-author">{element.author.name}</p>
                                    <p className="card-category">{element.category}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Books;