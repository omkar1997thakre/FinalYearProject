// to run the app.js
//1st step we need to use express.
const express= require("express")
//app is created with the help of express().so this app will contain all the methods and functions.
const app=express();
//declarig the path 
const path=require("path")
//we need the hbs packages
const hbs=require("hbs")







//port--> not to limit it on default port.
const port=process.env.PORT||3000;
//importing the connection.js module
require("./db/connection");
//importing the registeration file register.hbs
const Register = require("./models/register");
const { throws } = require("assert");

const static_path=path.join(__dirname,"../public")
//path for templates--> viws
const templates_path=path.join(__dirname,"../templates/views")
//path for partials
const partials_path=path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))


//to set the hbs engine
app.set("view engine","hbs")
//as the view folder is changed
app.set("views",templates_path)
//need to register that hbs
hbs.registerPartials(partials_path)
//to get the home page (req,res) are the callback functions
app.get("/",(req,res)=>{
    res.render("index")
    //res.send("WELCOME");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
//validtion

var database
//create a new database
app.post("/register", async(req,res)=>{
    
    const password= req.body.password;
    const confirmpassword=req.body.confirmpassword;

    if(password === confirmpassword)
    {
        const registerUser=new Register({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
        ConfrimPassword: req.body.confirmpassword,
        Address: req.body.address,
        City: req.body.city,
        State:req.body.state,
        Gender:req.body.gender,
    })

    const registered=await registerUser.save();
   return res.status(201).render("index");
 } 
 else {
    return res.send("Password not mtching")
 }
})

//to get the login page

app.get("/signin",(req,res)=>{
    res.render("login");

})

//to post

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'UserData';
const collectionName = 'registerdatas';

app.post('/login', (req, res) => {
  const userEnteredEmail = req.body.email;
  const userEnteredPassword = req.body.password;

  const client = new MongoClient(url, { useNewUrlParser: true });

  client.connect((err) => {
    if (err) {
      console.error('Error connecting to the server:', err);
      return res.status(500).send('Internal server error');
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.findOne({ Email: userEnteredEmail }, (err, user) => {
      if (err) {
        console.error('Error fetching data:', err);
        client.close();
        return res.status(500).send('Internal server error');
      }

      if (user) {
        // Email found in the database
        if (user.Password === userEnteredPassword) {
          // Password matches
          client.close();
          return res.render("index")
          //return res.status(200).send('Login successful, redirect to home page');
        } else {
          // Password doesn't match
          client.close();
          return res.status(401).send('Invalid password');
        }
      } else {
        // Email not found in the database
        client.close();
        return res.status(404).send('Email not found');
      }
    });
  });
});












//to listen the app at this port number
app.listen(port,()=>{
    console.log(`Server is running at port number ${port}`);
})