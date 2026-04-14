const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 3, title: "Aladdin-The magic lamp", author: "Krish"}
];

app.get('/books', (req, res) => {
  res.json(books);
});
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  books.splice(index, 1);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});