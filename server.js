var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081

app.get('/', function (req, res) {
     res.send('Hello World');
})


app.post('/', function (req, res) {
     console.log("Got a POST request for the homepage");
        res.send('Hello POST');
})


/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
app.get('/list_user', function (req, res) {
     console.log("Got a GET request for /list_user");
     res.send('Page Listing');
})



app.use(express.static('apidoc'));
app.get('/apidocs', function (req, res) {
      console.log("Got a GET request for /apidocs");
      res.sendFile(__dirname + "/apidoc/index.html");
})    
    

var server = app.listen(port, function () {
     var host = server.address().address;
     var port = server.address().port;
     console.log("Example app listening at http://%s:%s", host, port);
})
