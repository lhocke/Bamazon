
var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

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
            inventory.push({id: res[i].id, item: res[i].product_name, department: res[i].department_name, price: res[i].price, stock: res[i].stock_quantity});
        };
        console.log(inventory)
        console.table(['id','item','department','price','stock'], inventory);
        console.log(consoleTable)
        console.log("running")
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