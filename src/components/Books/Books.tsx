import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Book, Author } from '../../shared/interfaces';
import ContentLoader from "react-content-loader";

import './style.scss';

function Books(props: any) {
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [author, setAuthor] = useState<string>();

    const categories = [
        {name: 'Filozofi', value: 'f'},
        {name: 'Psikologji', value: 'p'},
        {name: 'Botime A.R', value: 'ar'},
        {name: 'Mitologji', value: 'm'},
        {name: 'Anglisht', value: 'a'},
        {name: 'Biografi', value: 'b'},
        {name: 'Enciklopedi, Fjalor dhe Shkence', value: 'e.f'},
        {name: 'Histori', value: 'h'},
        {name: 'Konspiracion', value: 'k'},
        {name: 'Letersi e Huaj', value: 'l.h'},
        {name: 'Letersi Shqipetare', value: 'l.sh'},
        {name: 'Religjion', value: 'r'},
        {name: 'Histori', value: 'h'}];

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

        authors.sort((a, b) => a.name > b.name ? 1 : -1);

        setAuthors(authors);
    }

    async function getData() {
        axios.get(`https://arsekretarite.com/books.json`)
            .then(res => {
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
            return '/images/book_images/p.png'
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
            filters+=`&category=${category}`;
        }

        if (title) {
            filters+=`&title=${title}`;
        }

        if (author) {
            filters+=`&authorId=${author}`;
        }

        let httpUrl = 'https://ar-sekretarite.herokuapp.com/books?_limit=-1&_sort=id:ASC'

        if (filters) {
            httpUrl = `https://ar-sekretarite.herokuapp.com/books/custom/search?_limit=-1&_sort=id:ASC${filters}`;
        }

        axios.get(httpUrl)
            .then(res => {
                setLoader(false);
                setFilteredBooks(res.data);
            })
    }

    function clearBooks() {
        window.location.reload();

    }

    function getBorrowHtml(element: Book) {
        const borrowedBook = element.borrowed_books.find(dicka => dicka.returned == false)

        return (
            borrowedBook && <div className="inside">
                <div className="icon">
                    <p>Huazuar</p>
                </div>
                <div className="contents">
                    <table>
                        <tr>
                            <th>Data e Huazimit: </th>
                        </tr>
                        <tr>
                            <td>{ borrowedBook.borrowed_date}</td>
                        </tr>
                        <tr>
                            <th>Data per tu Kthyer: </th>
                        </tr>
                        <tr>
                            <td> {borrowedBook.date_to_return} </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className="filter-bar row">
                <div className='col-md-4'>
                        <label>Titulli i Librit:</label>
                        <input placeholder={'Titulli'} onBlur={(event) => titleChange(event)} className="form-control" id="category" />
                    </div>
                <div className={'col-md-3'}>
                        <label>Kategoria:</label>
                        <select className="form-select" id="title" onChange={(event) => categoryChange(event)}>
                            <option value={''}>Te gjitha</option>
                            {
                                (categories || []).map((element) => {
                                    return (
                                        <option value={element.value} key={element.value}>{element.name}</option>
                                    )
                                })
                            }
                        </select>
                </div>
                <div className={'col-md-3'}>
                        <label>Emri i Autorit:</label>
                        <select className="form-select" id="author" onChange={(event) => authorChange(event)}>
                            <option value={''}>Te gjithe</option>
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
                    <div className={'buttons-plc'}>
                        <button onClick={() => filterBooks()} className={'btn btn-success'}>
                            Kërko
                        </button>
                        <button onClick={() => clearBooks()} className={'btn btn-warning'}>
                            Fshij
                        </button>
                    </div>
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
                        return !loader &&
                            <div key={element.id} className="book-card" data-category="fiction" data-title="1984" data-author="george_orwell">
                                {
                                    getBorrowHtml(element)
                                }
                                <div className={'image'} style={{
                                    backgroundImage: `url("${getImageUrl(element.category)}")`
                                }}>

                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">{element.title}</h4>
                                    <p className="card-author">{element.author_data ? element.author_data.name : element.author.name}</p>
                                    <p className="card-category">{element.category}</p>
                                </div>
                            </div>
                    })
                }

                {
                    (filteredBooks && filteredBooks.length == 0 && !loader) && <p>Momentalisht ky Liber nuk gjendet tek biblioteka :)</p>
                }
            </div>
        </div>
    );
}

export default Books;
