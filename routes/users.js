var express = require('express');
var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get('/thankyou', function (req, res) {
  res.send('thank you success');
});


/* GET userlist. */
router.get('/userlist', function(req, res) {
	console.log("Hello world!");
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser. */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});


/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});
module.exports = router;
