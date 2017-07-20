
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var table = new Table({
    head: ['ID', 'Item', 'Department', 'Price', 'In Stock']
  , colWidths: [4, 20, 20, 20, 20]
});

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_db"
});

var inventory = [];
var values = []

connection.connect(function(err){
    if (err) throw err;
    bamazonStart()
});

var bamazonStart = function(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        inventory = []
        for (var i = 0; i < res.length; i++) {
            // console.log("\nResult" + res[i].id);
            table.push([res[i].id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]);
        };
        // console.log(inventory)
    // table.push(inventory)
    console.log(table.toString());
    connection.end()
    })
};

// function purchase () {
//     connection.query("SELECT * FROM products", function(err, res) {
//         if(err) throw err;
//         values = [];
//         for (var i = 0 ; i < res.length ; i++) {
//             values.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity])
//         };
//         console.log(values)
//         console.table(['Item ID','Item','Department','Price', 'Stock'], values);
//     })
// }