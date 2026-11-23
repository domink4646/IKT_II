import express from "express";

const port = 3000;
const app = express();
app.use(express.json());

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 7, title: "Fahrenheit 451", author: "Ray Bradbury" },
    { id: 8, title: "Moby-Dick", author: "Herman Melville" },
    { id: 9, title: "War and Peace", author: "Leo Tolstoy" },
    { id: 10, title: "The Odyssey", author: "Homer" }
];

app.use("/books", (req, res) => {
    app.use(res.json(books));
});

app.get("/", (req, res) => {
    res.send("<h1>Hello, World!</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


