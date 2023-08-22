var bodyParser = require('body-parser')
var express = require("express");
var cors = require('cors')
var app = express()
var router = require("./routes/routes")
 try{
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// View engine
app.set('view engine','ejs');

app.use("/",router);

app.use( (req,res,next) =>{
    req.header('Origin','TRUE')
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    app.use(cors())
    next()
})
 




app.use(express.json())
app.use(cors())
 

app.listen(8687,() => {
    console.log("API ON")
});


 }catch(err){
    console.log('index err?: '+ err)
 }