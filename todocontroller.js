var bodyParser = require("body-parser");
var mongoose = require("mongoose")

//connect to the database
mongoose.connect("mongodb://test:test03@ds211275.mlab.com:11275/todo")

//create a schema-blueprint for our database
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model("Todo", todoSchema);



//var data =[{item: "get milk"}, {item:"walk dog"}, {item: "kick some coding ass"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

  //The url name
  app.get("/todo",function(req,res){
    //get data from mongodb and pass it through the view
    Todo.find({}, function(err,data) {
      if (err) throw err;
      res.render("todo", {todos:data});
    });
  });

  app.post("/todo",urlencodedParser, function(req,res){
    //get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function(req,res){
    //delete requested item from mongodb
    Todo.find({item:req.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });
}
