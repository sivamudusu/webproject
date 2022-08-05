const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const client = require("mailchimp-marketing");
const https = require("https")
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jasondata = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/3166feffea";

    const options = {
        method : "POST",
        auth : "shiva:d9745935057d33c4e3facbcae9666616-us10"
    }



    const request = https.request(url,options,function(response){

        if (response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jasondata);
    request.end();



})
app.post("/success",function(req,res){
    res.redirect("/");
    
})
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("satrted on port 3000");

})





// list id
// 3166feffea
// apikey
// d9745935057d33c4e3facbcae9666616-us10