var mysql = require('mysql');
var fs = require('fs');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

var bamazonStart = function(){
    console.log("\033c")

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'In Stock']
      , colWidths: [4, 20, 20, 20, 20]
    });

    // reads data from table products and pushes them to table
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]);
        };
        shopManage(res);
    })
};

var shopManage = function(item) {
    inquirer.prompt([
        {
           name: "job",
           message: "What would you like to do?",
           type: "list",
           choices: ["View Items", "See Low Inventory", "Update Stock", "Add An Item"] 
        }

    ]).then(function(choice){
        switch(choice.job){
            case "View Items":
                console.log(table.toString());
            break;
            case "See Low Inventory":
                lowCheck(item);
            break;
            case "Update Stock",
                update();
            break;
            case "Add An Item":
                itemAdd()
            break;
        }
    })
};

var lowCheck = function(item)