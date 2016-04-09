var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:room', function(req, res, next) {
  res.render('index');
});

router.get('/', function(req, res, next) {
  res.redirect('/anonimous');
});

module.exports = router;
