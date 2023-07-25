const React = require('react');
const NavBar = require('./NavBar');

module.exports = function Layout({
  children, login, user, title,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="/css/style.css" rel="stylesheet" />

        <script defer src="/js/auth.js" />
        <script defer src="/js/application.js" />
        <script defer src="/js/studentapplication.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js" />

        <title>{title}</title>
      </head>
      <body className="body">
        <div className="content-wrapper">
          <NavBar user={user} />
          <div className="content">{children}</div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-column">
                <h3>About</h3>
                <p>About text</p>
              </div>
              <div className="footer-column">
                <h3>Contact</h3>
                <p>Contact information</p>
              </div>
              <div className="footer-column">
                <h3>Follow Us</h3>
                <p>Social media links</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
};
