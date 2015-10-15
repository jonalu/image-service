var template = require('es6-template-strings');

module.exports = function (req, res, next) {
  res.set('Cache-Control', template('public, max-age=${maxAge}', { maxAge: process.env.CACHE_MAX_AGE || 120000 }));
  next();
};
