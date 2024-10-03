import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Add = () => {

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

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //book to je json object 
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="form">
            <h1>Add New Book</h1>
            {/* names musia byť také ako sú presne v useState */}
            <input
                type="text"
                placeholder="Book title"
                name="title"
                onChange={handleChange}
            />
            <textarea
                rows={5}
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
                placeholder="Paste link of image"
                name="cover"
                onChange={handleChange}
            />
            {/* Tlačidlo ktoré tie vyplnené polia odošle do backend serveru */}
            <button className="formButton" onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Add;