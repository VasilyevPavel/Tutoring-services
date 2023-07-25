const React = require('react');

module.exports = function NavBar({ login, user, userType }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Logo</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <a href="/" className="nav-link">Home</a> */}
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <a href={userType === 'teacher' ? '/teacher' : '/student'} className="nav-link">
                Hello
                {' '}
                {user}
              </a>
            </li>
            <li className="nav-item">
              <a href="/auth/logout" className="nav-link">Logout</a>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <a href="/login" className="nav-link">Login</a>
            </li>
            <li className="nav-item">
              <a href="/registration" className="nav-link">Registration</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
