var fs = require('fs'),
    template = require('es6-template-strings');

module.exports = function (req, res, next) {
  fs.readdir(process.env.IMAGE_DIR || __dirname + '/../images', function(err, files) {
    res.render('gallery', {
      images: files
        .filter(function(file) {
          return file.length && file[0] !== '.';
        })
        .map(function(file) {
          return template('${filename}?w=${w}', { filename: file, w: (req.query.w || '150') });
        })
    });
  });
};
