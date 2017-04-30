// Import MySQL connection.
var connection = require("../config/connections.js");

//Returns a CRUD ORM
var orm = function() {
    //Takes single/array of values that will be inputted. Then returns the
    //number of question marks mySQL needs to insert/create/update/query
    var questionMarkGenerator = function(data) {
        var questions = [];
        for(key in data.vals){
            questions.push(data.vals[key]);
        }
        return questions.join(",");
    }

    //Take object convert into string formatted for mySQL
    var objToSql = function(obj) {
        var arr = [];

        for (var key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
            arr.push(key + "=" + obj[key]);
            }
        }

        return arr.toString();
    }

    //Set 
    //Data is:
    // {
    //     tableTarget : "?",
    //     cols : "toTarget",
    //     vals : "toQuery",
    // }
    var set = function(data, cb) {
        var queryString = "INSERT INTO  " + data.tableTarget;

        queryString += " (" +
                            data.cols.toString() +
                            ") " +
                            "VALUES (" +
                            questionMarkGenerator(data) +
                            ") ";
        //debug log
        console.log("findAll called: " + queryString);

        connection.query(queryString, data.vals, function(err, res){
            if(err) throw err;

            cb(res);
        });
    }

    //Get all
    //tableTarget = String(table_name)
    var getAll = function(tableTarget, cb) {
        var queryString = "SELECT * FROM " + tableTarget;

        connection.query(queryString, function(err, res){
            if(err) throw err;
            cb(res);
        });
    }

    //Get conditional
    // {
    //     tableTarget : "?",
    //     condition : String("? = ?"),
    // }
    var get = function(data, cb) {
        var queryString = "SELECT * FROM " + data.tableTarget;

        queryString += " WHERE " + data.condition;

        connection.query(queryString, function(err, res){
            if(err) throw err;
            
            cb(res);
        });
    }

    //Update 
    //Data is:
    // {
    //     tableTarget : "?",
    //     colValues : {text: "?", exist : "?"},
    //     condition : "toQuery",
    // }
    var update = function(data, cb) {
        var queryString = "UPDATE " + data.tableTarget;

        queryString += " SET " +
                        objToSql(data.colValues) +
                        " WHERE " +
                        data.condition;

        connection.query(queryString, function(err, res){
            if(err) throw err;
            
            cb(res);
        });
    }

    //Delete conditional
    // {
    //     tableTarget : "?",
    //     condition : String("? = ?"),
    // }
    var del = function(data, cb) {
        var queryString = "DELETE FROM " + data.tableTarget;

        queryString += " WHERE " +  data.condition;

        connection.query(queryString, function(err, res){
            if(err) throw err;
            
            cb(res);
        });
    }

    return {
        set : set,
        get : get,
        getAll : getAll,
        update : update,
        del : del
    }
};

//Export to model burger.js
module.exports = orm();