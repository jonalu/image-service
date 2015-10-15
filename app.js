var express = require('express'),
    gm = require('gm'),
    multer = require('multer'),
    app = express(),
    template = require('es6-template-strings');

app.set('view engine', 'jade');

var upload = multer({
  dest: __dirname + '/images/'
});

app.get('/', function(req, res, next) {
  res.render('upload');
});

app.post('/', upload.single('photo'), function(req, res, next) {
  res.redirect('/' + req.file.filename);
});

app.get('/:image', function (req, res, next) {
  gm(template('./images/${image}', { image: req.params.image }))
    .format(function(err, type){
      if(!err){
        res.set('Content-Type', template('image/${imageType}', { imageType: type.toLowerCase() }));
        res.set('Cache-Control', 'public, max-age=120000');
      }
      return this;
    })
    .resize(req.query.w, req.query.h)
    .autoOrient()
    .stream(function (err, stdout, stderr) {
      if(err) {
        res.status(404).send('Vi kan desverre ikkje finne bildet du etterspurde');
      } else {
        stdout.pipe(res);
        stdout.on('error', function(err) {
          res.status(503).send('En feil oppstod under generering av bildet');
        });
      }
    });
});

app.listen(process.env.PORT || 3005);
