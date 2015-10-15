var template = require('es6-template-strings'),
    multer = require('multer');

var upload = multer({
  dest: process.env.IMAGE_DIR || __dirname + '/../images'
});

module.exports = upload.single('photo');
