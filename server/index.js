import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

//express server middleware, umožnuje nám to poslať akýkoľvek json file s pomocou client
app.use(express.json());
app.use(cors());
 

//connect to mysql db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mostlycloudlyT10",
    database: "test"
});


//homepage  backend server
app.get("/", (req, res) => {
    res.json("Hellloooo");
});


//to nám vráti všetky knihy v DB
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });

});

//params.id reprezentuje toto "/books/:id" a to id je specific. id

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



//port number
app.listen(8000, () => {
    console.log("Connected to backend!");
});


















