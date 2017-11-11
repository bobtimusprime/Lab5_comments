var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB', {useMongoClient: true});

/*Set up the schema for the comment database*/
var commentSchema = mongoose.Schema({
  Name:String,
  Comment:String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET SERVICE*/
router.get('/fake', function(req, res, next) {
  console.log('Inside of Fake');
  var fakelist = [{Name:"Jim", Comment:"Hello"}];
  res.json(fakelist);
});

/*Post to database*/
router.post('/comment', function(req, res, next) {
  console.log('Inside of Comment Post');
  console.log(req.body);
  var newcomment = new Comment(req.body);
  newcomment.save(function(err, post){
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);  
  })  
});

/*Search Database*/
router.get('/comment', function(req, res, next) {
  console.log("Inside get comments");
  Comment.find(function(err, commentList) {
    if(err) return console.error(err);
    else{
      console.log(commentList);
      res.json(commentList);
    }
  });
});

/*Delete database*/
router.delete('/comment', function(req, res, next) {
  console.log('In the comment delete');
  Comment.remove(function(err) {
    if(err) return console.error(err);
    else {
      console.log('Delete worked');
      res.sendStatus(200);
    }
  });
});

module.exports = router;
