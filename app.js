const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
    let data = {
        members: [
            {
            email_address: req.body.email,
            status: "subscribed",
            merge_fields:{
                FNAME: req.body.firstName,
                LNAME: req.body.lastName
            }
        }]
    };

    let jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/f371c4744d";
    const options = {
        method: "POST",
        auth: "Picus:bbabd5f912e47b92fd6b012ccd01e796-us12"

    };
    const request = https.request(url, options, (response) =>{
        console.log("statusCode: ", response.statusCode); // <======= Here's the status code
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            res.sendFile(__dirname + "/success.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

}); 

app.post("/failure", (req,res) => {
    res.redirect("/");
});

app.listen(3000, () =>{
    console.log("Server is up and running on port 3000");
});

// mailchimp key bbabd5f912e47b92fd6b012ccd01e796-us12
// List ID f371c4744d