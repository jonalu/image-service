var gm = require('gm'),
    template = require('es6-template-strings');

module.exports = function (req, res, next) {
  gm(template('${imageDir}/${image}', { image: req.params.image, imageDir: process.env.IMAGE_DIR || __dirname + '/../images' }))
    .format(function(err, type){
      if(!err){
        res.set('Content-Type', template('image/${imageType}', { imageType: type.toLowerCase() }));
      }
      return this;
    })
    .resize(req.query.w, req.query.h)
    .autoOrient()
    .stream(function (err, stdout, stderr) {
      handleStream(err, stdout, stderr, res);
    });
};

function handleStream(err, stdout, stderr, res) {
  if(err) {
    res.status(404).send('Vi kan desverre ikkje finne bildet du etterspurde');
  } else {
    stdout.pipe(res);
    stdout.on('error', function(err) {
      res.status(503).send('En feil oppstod under generering av bildet');
    });
  }
}
