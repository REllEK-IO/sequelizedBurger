var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function(req, res) {
    burger.all(function(data){
        var hbsObject = {
            burgers : data
        }
        res.render("index", hbsObject);
    })
});

router.post("/api/new", function(req, res){
    burger.create([
        "`burger_name`",
        "`devoured`",
        "`date`"
    ],[
        '"' + req.body.text + '"',
        false,
        '"' + ((new Date()).toISOString().slice(0, 19).replace('T', ' ')) + '"'
    ], function(){
        res.redirect("/");
    });
});

router.put("/api/eat", function(req, res){
    burger.update({
        devoured : true
    },"id = " + req.body.id, function(){
        res.redirect("/");
    });
});

router.put("/api/update", function(req, res){
    burger.update({
        burger_name : '"' + req.body.newText + '"'
    },"id = " + req.body.id, function(){
        res.redirect("/");
    });
});

router.delete("/api/eat", function(req, res){
    burger.del("id = " + req.body.id, function(){
        res.redirect("/");
    });
});

module.exports = router;