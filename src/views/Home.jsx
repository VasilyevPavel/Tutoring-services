const React = require('react');
const Layout = require('./Layout');

function Home({
  title, login, userType, books,
}) {
  return (
    <Layout>
      <h1 className="intro">Первый репетиторский</h1>
      <div className="centered-container">
        <div className="centered-content">
          <h2>Преподаватели рекомендуют к прочтению:</h2>
          <div className="bookContainer">
            <div className="books-row">
              {books.map((book, index) => (
                <div className="book" key={index}>
                  <img src={book.coverUrl} alt="Book" />
                  <h3>{book.bookTitle}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Home;
