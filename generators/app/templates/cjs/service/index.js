
App.get('/jetecho/{id}', function(req,res) {
    res.send("You found me here in JetService land, id="+req.params.id);
});

App.get('/people',function(req,res,ctx) {
	var data = require('./people.json');
	res.send(JSON.stringify(data));
});

App.get('/restecho', function (req, res) {
	var client = Http.connect('https://httpbin.org');
    client.addRequestHeader('Accept','application/json');
    client.get('/get');
    res.send(client.body);
});

App.get('/users',function (req,res,ctx) {
    try {
    	var db = Db.connect('com.mysql.jdbc.Driver','jdbc:mysql://localhost/dxp','root',null);
        var rows = db.query('select * from user_');
        db.close();
        res.send(JSON.stringify(rows));
    } catch (e) {
        console.log(e.toString());
    }
});