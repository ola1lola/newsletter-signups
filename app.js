const express=require("express");
const bodyparser=require("body-parser");
const  request=require("request");
const https=require("https");
const { post } = require("request");
const app=express();
app.use(express.static("public"));
//providing path of static files by creating a new folder public where all static members are put in 
//because our signup.html page is static because our one style sheet is local and one is from botostrap
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
 var firstname=req.body.fname;
 var lastname=req.body.lname;
 var email=req.body.email;
 var data={
    members:[{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname
          }
      }
    ]
 };
 var jsondata=JSON.stringify(data);
 const option={
    method: "POST",
    auth: "saatvik3:50f3f1f359e0b6da31ea9b776d0a95ca-us9"
 }
 const url="https://us9.api.mailchimp.com/3.0/lists/f2df3945fb";
const request=https.request(url,option,function(response){
  if(response.statusCode===200)
  {
    res.send("success fully subscribed");
  }
  else
  {
    res.send("there is an erorr try again");
  }
 response.on("data",function(data){
console.log(JSON.parse(data));
 });
});
request.write(jsondata)
request.end();
})

app.listen(process.env.PORT||3000,function(req,res){ //process.env is object of horuku and 3000 is localhost to test 
    console.log("server started on port 3000");
})
//api key=50f3f1f359e0b6da31ea9b776d0a95ca-us9
//list id=f2df3945fb