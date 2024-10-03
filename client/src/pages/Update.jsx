import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {

    //kedykoľvek keď zmením ktorúkoľvek hodnotu priamo vo forme tak sa použije to setBook 
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });


    const [error, setError] = useState(false)

    //navigate na homepage 
    const navigate = useNavigate();

    const location = useLocation();

    const bookId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //book to je json object 
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8000/books/" + bookId, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="form">
            <h1>Update the Book</h1>
            {/* names musia byť také ako sú presne v useState */}
            <input
                type="text"
                placeholder="Book title"
                name="title"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Book desc"
                name="desc"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Book price"
                name="price"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Book cover"
                name="cover"
                onChange={handleChange}
            /> 

            <button className="formButton" onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;