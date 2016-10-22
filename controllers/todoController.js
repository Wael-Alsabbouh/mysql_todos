var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
	//properties
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'todo_db'

});

connection.connect(function(error){
	if(!!error){
		console.log('Error connecting to Database');
	}else{console.log('Connected to DATABASE')};
});

var urlencodedParser = bodyParser.urlencoded({extended: false}); //to parse the data
																 //and use it in posting

module.exports = function(app){

app.get('/', function(req, res){
	connection.query('SELECT * FROM tasks', function(error, rows, fields){
		if(!!error){
			console.log('Error in the query');
		} else{
			res.render('todo', {todos: rows});
		}
	});
});


app.post('/todo', urlencodedParser, function(req, res){
  console.log(req.body.item);

  var newTask={
  	task_name: req.body.item
  };
  connection.query('INSERT INTO tasks set ?', newTask, function(error, result){
		if(!!error){
			console.log('Error in the INSERT query');
		} else{
			console.log('the new task has been added!!');
		}
	});
});


app.delete('/todo/:item', function(req, res){
	var reqParam=req.params.item.replace(/\-/g, " ");
	console.log(reqParam);
connection.query('DELETE FROM tasks WHERE task_name ='+"'"+reqParam+"'", function(error, result){
		if(!!error){
			console.log('Error in the DELETE query');
		} else{
			console.log('item has been deleted');
		}
	});

});
};