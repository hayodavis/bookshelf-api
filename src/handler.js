const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);

  const insertAt = new Date().toString();
  const updateAt = insertAt;
  const finished = pageCount === readPage;

  const saveBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertAt,
    updateAt,
  };

  books.push(saveBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // mandatory Add Book With Complete Data
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = { addBookHandler };
