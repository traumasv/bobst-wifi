const express = require('express');
const path = require('path');
require('./db');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.urlencoded({extended: false}));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  const html = path.resolve(__dirname,'dist', 'app.html');
  res.sendFile(html);
});

app.get('/getposts', function(req, res){
  let query = {};

  Post.find(query, function(err, posts){
      if(err){
        res.send(err);
      }
      //reversing the order of the posts so that it shows later dates first
      posts.reverse();
      res.json(posts);
  });

});

app.get('/getbobcat', function(req, res){
  const bobcat = 'bobcat.jpg';
  res.send(bobcat);
});

app.post('/', function(req,res){
    const date = new Date();
    const post = new Post({time:date, status:req.body.status, area:req.body.area}); 
    post.save(function(err,saved,count){
        if(err){
          res.send(err);
        }
        else{
            io.emit('newPost', {time:date, status:req.body.status, area:req.body.area});
        }
    });
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('server started...');
  if(process.env.NODE_ENV === "PRODUCTION"){
    console.log('In Production Mode');
  }
});