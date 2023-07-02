const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));// other files used in .html wouldn't load without this, all paths start inside "public" folder
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) => {
    /* console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email); */
    
}); 

app.listen(3000, () =>{
    console.log("Server is up and running on port 3000");
});