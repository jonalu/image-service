var express = require('express'),
    app = express(),
    router = express.Router(),
    middlewares = require('./middlewares');

app.set('view engine', 'jade');

app.use('/assets', express.static(__dirname + '/public'));

app.route('/')
  .get(function(req, res, next) { res.render('upload'); })
  .post(middlewares.upload, function(req, res, next) {
    res.redirect('/' + req.file.filename);
  });

app.get('/gallery', middlewares.gallery);
app.get('/:image', middlewares.cachecontrol, middlewares.gm);

app.listen(process.env.PORT || 3005);
