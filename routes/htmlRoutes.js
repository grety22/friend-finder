var express = require('express');
var router = express.Router();
var tableData = require("../data/users");
var fs = require("fs");
//console.log(tableData);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'HOME' });
});

/* GET survey page. */
router.get('/survey', function(req, res, next) {
  res.render('survey', { title: 'Survey to find your friend Match:'});
});

/* GET API */
router.get('/api', function(req, res, next) {
  res.send(tableData);
});

/* POST API */
router.post('/api', function(req, res, next) {
  var newUser = req.body;

  console.log(newUser);

  tableData.push(newUser);
    
  fs.writeFile('./data/users.json', JSON.stringify(tableData), 'utf-8', function(err) {
	if (err) throw err
	console.log('Done!');
    console.log(JSON.stringify(tableData));
  }); 
    
  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push({id: 2, square:3}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
}});    

//  res.json(newUser);
});

module.exports = router;
