const router = require('express').Router();

router.get('/random-book-cover', async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 1000) + 1;
    const response = await fetch(`https://openlibrary.org/works.json?limit=1&page=${randomPage}`);
    const data = await response.json();

    if (data && data.works && data.works.length > 0) {
      const book = data.works[0];
      const coverId = book.cover_id;

      if (coverId) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        res.json({ coverUrl });
      } else {
        res.status(404).json({ error: 'Обложка книги не найдена.' });
      }
    } else {
      res.status(404).json({ error: 'Книги не найдены.' });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
