const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    
    if(!newBook.title || !newBook.author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    
    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(port, () => {
    console.log(`Bookstore API running at http://localhost:${port}`);
});