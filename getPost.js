var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7321);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});


app.post('/sent', function(req,res){
  var queries = [];
  for (var q in req.body){
    queries.push({'name':q,'value':req.body[q]})
  }
  //console.log(queries);
  //console.log(req.body);
  var out = {};
  out.dataList = queries;
  res.render('sentPOST', out);
});

app.get('/sent', function(req,res){
	var queries = [];
	for (var q in req.query) {
		queries.push({"name":q, "value":req.query[q]})
	}
	var out = {};
	out.dataList = queries;
	res.render('sentGET', out)
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
