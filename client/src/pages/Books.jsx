import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
 
const Books = () => {
    //useState kde ukladám všetky knihy 
    const [books, setBooks] = useState([]);

    //fetching funkcia, async preto lebo vytvárame api request 
    //kedykoľvek keď spustíme tento Book component tak to spustí tento useEffect a vo vnútri useEffectu máme
    //funkciu ktorá fetchne všetky data
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books")
                setBooks(res.data);
                //console.log(res)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);



    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/books/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }


    return (

        <section>
            <div class="wrapper">
                <h2 className='title'>New BookShop</h2>
            </div>
            <div className='books'>
                {books.map(book => (
                    <div className='book' key={book.id}>
                        {book.cover && <img src={book.cover} alt=''></img>}
                        <div className='book-price'>${book.price}</div>
                        <h2 className='book-title'>{book.title}</h2>
                        <p className='book-p'>{book.desc}</p>
                        <div className='btn'>
                            <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        </div>

                    </div>
                ))}

            </div>
            <div>
                <button className='addHome'><Link to="/add">Add new book</Link></button>
            </div>
        </section>

    )
}

export default Books