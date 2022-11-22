const mysql = require('mysql');
const database_config = require('./database')
const Dictionary = require('./WordDictionary')

class Model {
    static tbl = '';

    static getTableName() {
        let tbl_name = '';
        let m = new this()
        if (this.tbl == '') {
            tbl_name = m.constructor.name
            tbl_name = tbl_name.toLowerCase()
            tbl_name = tbl_name.replace("model", "")
            tbl_name = Dictionary.plural(tbl_name)
        } else {
            tbl_name = this.tbl
        }
        console.log(this.tbl)
        return tbl_name
    }


    static find(id, callback) {
        let tbl = this.getTableName()
        const con = mysql.createConnection(database_config);
        var data = {}
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = "SELECT * FROM " + tbl + " WHERE id=" + id + " LIMIT 1";
            con.query(sql, function (err, result) {
                return callback(result)
            });
        });

    }

    static create(req) {
        let tbl = this.getTableName()
        const con = mysql.createConnection(database_config);
        var data = {}
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO " + tbl + " (`subject`, `message`,`from`,`to`) VALUES ('" + req.subject + "','" + req.message + "','" + req.from + "','" + req.to + "')";
            con.query(sql, function (err, result, fields) {
                if (err) console.log(err);
                console.log("Data Inserted")
                return result
            });
        });

    }
}

module.exports = Model