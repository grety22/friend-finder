var express = require('express');
var router = express.Router();

var tableData = require("../data/users");
console.log(tableData);
/* GET survey page. */
router.get('/api', function(req, res, next) {
  res.render('api', { title: 'API' });
});

module.exports = router;