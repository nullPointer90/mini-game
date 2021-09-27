var express = require("express");
var app = express();

const path = require("path");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
//server.listen(3000);
server.listen((process.env.PORT || 5001), function(){
    console.log('listening on *:5001');
  });

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minigame:4tFgpwk4ZSQJz1vj@cluster0.uwlph.mongodb.net/minigame?retryWrites=true&w=majority', function(err)
{
    if (err)
    {
        console.log("Mongo connected error : " + err);
    }
    else
    {
        console.log("Mongo connect successfully");
    }
});

require(path.join(__dirname,"controllers/game"))(app);