const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  const fristname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fristname,
        LNAME: lastname
      }
    }]
  }


  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/18a00211c4";
  const options = {
    method: "POST",
    auth: "abhinap:6be7224c779ede8454843d347ff12813-us6"
  }

  const requestt = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });

  requestt.write(jsonData);
  requestt.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen( process.env.PORT || 3000, function() {
  console.log("server started at port 3000");
})


// api key
// 6be7224c779ede8454843d347ff12813-us6

// list id
// 18a00211c4
