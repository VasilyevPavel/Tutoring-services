const React = require('react');
const Layout = require('./Layout');

module.exports = function Registration() {
  return (
    <Layout>
      <form name="regForm" type="submit">
        <h3 id="registerInfo">Registration</h3>
        <input
          required
          className="input-field"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
        />
        <input
          required
          className="input-field"
          type="text"
          name="lastName"
          placeholder="Last name"
          autoComplete="off"
        />
        <input
          required
          className="input-field"
          type="email"
          name="login"
          placeholder="E-mail"
          autoComplete="off"
        />
        <input
          required
          className="input-field"
          type="password"
          name="password"
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
