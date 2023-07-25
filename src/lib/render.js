require('@babel/register');
const ReactDomServer = require('react-dom/server');
const React = require('react');

const render = (reactComponent, props, res) => {
  const reactElement = React.createElement(reactComponent, {
    ...props,
    ...res.locals,
    ...res.app.locals,
  });
  const html = ReactDomServer.renderToStaticMarkup(reactElement);
  res.send(`<!DOCTYPE html>${html}`);
};

module.exports = render;
