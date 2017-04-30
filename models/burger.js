var orm = require("../config/orm");

var burger = function(){
    var all = function(cb){
        orm.getAll("burgers", function(res){
            cb(res);
        });
    }

    var get = function(condition, cb){
        orm.get({
            tableTarget : "burgers",
            condition : condition
        }, function(res){
            cb(res);
        });
    }

    var create = function(cols, vals, cb){
        orm.set({
            tableTarget : "burgers",
            cols : cols,
            vals : vals
        }, function(res){
            cb(res);
        });
    }

    var update = function(objColVals, condition, cb){
        orm.update({
            tableTarget : "burgers",
            colValues : objColVals,
            condition : condition
        }, function(res){
            cb(res);
        });
    }

    var del = function(condition, cb){
        orm.del({
            tableTarget : "burgers",
            condition : condition
        }, function(res){
            cb(res);
        });
    }
    return{
        all : all,
        get : get,
        create : create,
        update : update,
        del : del
    }
}

module.exports = burger();