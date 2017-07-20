
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
        console.log(table.toString());
        letsShop(res)
    })
};

var letsShop = function(items) {
    inquirer.prompt([
        {
            name: "purchase",
            message: "Which item number would you like to purchase?",
            type: "input",
            validate: function(input){
                if (!input || parseInt(input) > items.length) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: "quantity",
            message: "How many would you like to purchase?",
            type: "input",
            validate: function(input){
                if (!input) {
                    return false
                } else {
                    return true
                }
            }
        }
    ]).then(function)
}
    
    // connection.end()
