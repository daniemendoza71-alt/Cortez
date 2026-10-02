var express = require("express");
var app = express();
var path = require("path");

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = [
    {
        id:1,
        firstname: 'John',
        lastname: 'Smith',
        age: 20
    },
    {
        id:2,
        firstname: 'Jane',
        lastname: 'Smith',
        age: 22
    }
]


app.get('/', function(request, response){
    const filepath = path.join(__dirname, 'public/pages', 'index.html');
    response.sendFile(filepath);
    console.log('This is the homepage')
})

app.get('/register', function(request, response){
    const filepath = path.join(__dirname, 'public/pages', 'register.html');
    response.sendFile(filepath);
    console.log('This is the form page')
})


app.get('/profile', function(request, response){
    const filepath = path.join(__dirname, 'public/pages', 'profile.html');
    response.sendFile(filepath);
})

app.get('/edit-profile', function(request, response){
    const filepath = path.join(__dirname, 'public/pages', 'edit-profile.html');
    response.sendFile(filepath);
    console.log('This is the edit profile page')
})

app.get('/user/:id', function(req, res){
    const id = req.params.id;
    res.send("ID: ${id}, You can edit your profile")
})

app.use(express.urlencoded({extended: true}));

app.post('/register', function(req, res){
    let recordCount = users.length;
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var age = req.body.age;
    let info = {
        id: recordCount,
       "firstname": fname,
       "lastname": lname,
       "age": age
    };
    users.push(info);
    res.json(users)
    console.log('This is the user page')
})

app.delete('/delete-user/:id', function(req, res){
    const user_id = parseInt(req.params.id);
    console.log(user_id);
    const userIndex = users.findIndex(user => user.id === user_id);
    users.splice(userIndex, 1);
    res.json(users);
})

app.get('/show-users', function(req, res){
    res.json(users);
})

app.listen(3000, function(){
    console.log('Server running at http://localhost:3000');
})

