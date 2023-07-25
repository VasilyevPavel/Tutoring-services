const React = require('react');
const Layout = require('./Layout');

module.exports = function LogIn() {
  return (
    <Layout>
      <form name="logForm">
        <h3 id="loginInfo">Log In</h3>
        <input
          name="login"
          required
          className="input-field"
          type="text"
          placeholder="E-mail"
          autoComplete="off"
        />
        <input
          name="password"
          required
          className="input-field"
          type="password"
          placeholder="Password"
        />
        <select className="input-field" name="userType">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="studentSubjectBtn button" type="submit">Submit</button>
      </form>
    </Layout>
  );
};
