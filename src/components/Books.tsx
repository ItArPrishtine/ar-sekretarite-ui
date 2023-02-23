import React, {useEffect, useState} from "react";
import axios from 'axios';
import './style.scss';

function Books() {
    const [bookList, setBookList] = useState<any[]>([]);

    async function getData() {
        axios.get(`https://ar-sekretarite.herokuapp.com/books?_limit=-1&&_sort=id:ASC`)
            .then(res => {
                setBookList(res.data);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    function getImageUrl(category: string) {
        const cat = category.toLowerCase();

        if (cat.startsWith('f')){
            return '/images/book_images/f.png'
        } else if (cat.startsWith('a')){
            return '/images/book_images/a.png'
        } else if (cat.startsWith('ar')){
            return '/images/book_images/ar.png'
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

    return (
        <div className='container'>
            <div className="filter-bar row">
                <div className='col-md-4'>
                        <label>Titulli i Librit:</label>
                        <input className="form-control" id="category" />
                    </div>
                <div className={'col-md-4'}>
                        <label>Kategoria:</label>
                        <select className="form-select" id="title">
                            <option value="">All</option>
                            <option value="the_catcher_in_the_rye">The Catcher in the Rye</option>
                            <option value="to_kill_a_mockingbird">To Kill a Mockingbird</option>
                            <option value="1984">1984</option>
                            <option value="pride_and_prejudice">Pride and Prejudice</option>
                            <option value="the_great_gatsby">The Great Gatsby</option>
                        </select>
                </div>
                <div className={'col-md-3'}>
                        <label>Emri i Autorit:</label>
                        <select className="form-select" id="author">
                            <option value="">All</option>
                            <option value="j_d_salinger">J.D. Salinger</option>
                            <option value="harper_lee">Harper Lee</option>
                            <option value="george_orwell">George Orwell</option>
                            <option value="jane_austen">Jane Austen</option>
                            <option value="f_scott_fitzgerald">F. Scott Fitzgerald</option>
                        </select>

                    </div>
                <div className={'col-md-1'}>
                    <button className={'btn btn-primary'}>
                        Filtro
                    </button>
                </div>
            </div>
            <div className="book-cards">
                {
                    (bookList || []).map((element) => {
                        return (
                            <div key={element} className="book-card" data-category="fiction" data-title="1984" data-author="george_orwell">
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