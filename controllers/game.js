
var Person = require("../models/Person");

module.exports = function(app){
    app.get("/", function(req, res){
        res.render("layout");
    })
    
    app.post("/register", function(req, res){
        console.log("Email : " + req.body.Email);
        console.log("Name : " + req.body.Name );
        console.log("Phone : " + req.body.Phone);
        if (!req.body.Email || !req.body.Name || !req.body.Phone)
        {
            res.json({result : -1, error : "Missing parameter"});
        }
        else
        {
            var newPerson = new Person({
                Email:req.body.Email,
                Name:req.body.Name,
                Phone:req.body.Phone,
                Pay:false,
                Wallet:"",
                Date:Date.now()
            });

            newPerson.save(function(err){
                if (err)
                {
                    res.json({result : -1, error : "Mongodb save error" + err});
                }
                else
                {
                    res.json({result:0, error:newPerson});
                }
            })
        }
    });
}