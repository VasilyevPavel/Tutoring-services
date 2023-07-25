const render = require('../lib/render');

const ssr = (req, res, next) => {
  res.render = (reactComponent, props) => {
    render(reactComponent, { ...props, user: req.session?.user }, res);
  };
  next();
};

module.exports = ssr;

