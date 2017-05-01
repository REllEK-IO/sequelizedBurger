var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    // burger.all(function(data){
    //     var hbsObject = {
    //         burgers : data
    //     }
    //     res.render("index", hbsObject);
    // })
    db.Burger.findAll({}).then(function(data) {
        var hbsObject = {
            burgers: data
        }
        res.render("index", hbsObject);
    });
});

router.post("/api/new", function(req, res) {
    // burger.create([
    //     "`burger_name`",
    //     "`devoured`",
    //     "`date`"
    // ], [
    //     '"' + req.body.text + '"',
    //     false,
    //     '"' + ((new Date()).toISOString().slice(0, 19).replace('T', ' ')) + '"'
    // ], function() {
    //     res.redirect("/");
    // });
    db.Burger.create({
        burger_name: req.body.text
    }).then(function() {
        res.redirect("/");
    })
});

router.put("/api/eat", function(req, res) {
    // burger.update({
    //     devoured: true
    // }, "id = " + req.body.id, function() {
    //     res.redirect("/");
    // });
    db.Burger.update({
        devoured: true
    }, {
        where: { id: req.body.id }
    }).then(function() {
        res.redirect("/");
    });
});

router.put("/api/update", function(req, res) {
    // burger.update({
    //     burger_name: '"' + req.body.newText + '"'
    // }, "id = " + req.body.id, function() {
    //     res.redirect("/");
    // });

    db.Burger.update({
        burger_name: req.body.newText
    }, {
        where: { id: req.body.id }
    }).then(function() {
        res.redirect("/");
    });
});

router.delete("/api/eat", function(req, res) {
    // burger.del("id = " + req.body.id, function() {
    //     res.redirect("/");
    // });
    db.Burger.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.redirect("/");
    })
});

module.exports = router;