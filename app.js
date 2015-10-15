var express = require('express'),
    multer = require('multer'),
    app = express(),
    router = express.Router(),
    middlewares = require('./middlewares');

app.set('view engine', 'jade');
app.use('/assets', express.static(__dirname + '/public'));

var upload = multer({
  dest: process.env.IMAGE_DIR || __dirname + '/images'
});

app.route('/')
  .get(function(req, res, next) {
    res.render('upload');
  })
  .post(upload.single('photo'), function(req, res, next) {
    res.redirect('/' + req.file.filename);
  });

app.get('/gallery', middlewares.gallery);

app.get('/:image', middlewares.gm);


app.listen(process.env.PORT || 3005);
