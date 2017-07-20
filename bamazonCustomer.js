
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
    // reads data from table products and pushes them to table
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
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
    ]).then(function(response) {
        var chosenItem = response.purchase -1;
        var amount = parseInt(response.quantity)
    
        if (parseInt(amount) > items[chosenItem].stock_quantity) {
            console.log("Sorry, we don't have that many, please enter a smaller amount");
            letsShop(items)
        } else {
            console.log("Your total is: " + items[chosenItem].price * response.quantity)
            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [parseInt(items[chosenItem].stock_quantity) - parseInt(response.quantity), items[chosenItem].id], function(err) {
                if (err) throw err;
            })
            inquirer.prompt([
                {
                    name: "again",
                    message: "Would you like to buy something else? (Y/N)",
                    type: "confirm",
                    default:false
                }
            ]).then(function(response) {
                switch(response.again){
                    case true:
                        letsShop(items)
                    break;
                    case false:
                        console.log("Thanks for shopping! Come again soon!");
                        connection.end()
                }
            })
        }
    })
}
