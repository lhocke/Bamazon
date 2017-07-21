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
        head: ['ID', 'Item', 'Department', 'Price', 'In Stock'],
        colWidths: [4, 20, 20, 20, 20]
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
                lowCheck(res);
            break;
            case "Update Stock",
                update(res);
            break;
            case "Add An Item":
                itemAdd(res)
            break;
        }
    })
};

var lowCheck = function(item) {
    console.log("\033c");
    var lowTable = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'In Stock'],
        colWidths: [4, 20, 20, 20, 20]
    });
    for (var i = 0; i < item.length; i++) {
        if (item[i].stock_quantity < 4) {
            lowTable.push(([res[i].id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]))
        }
    }
    console.log(newTable.toString());
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: ["Update Stock", "Add An Item", "View All Items", "Exit"]
        }
    ]).then(function(req){
        switch(req.action){
            case "View All Items":
                console.log("\033c", table.toString());
                shopManage(res)
            break;
            case "Update Stock":
                update(res);
            break;
            case "Add An Item":
                itemAdd(res)
            break;
            case "Exit":
                process.exit()
            break;
        }
    })
}

var update = function(a) {
    console.log("\033c");
    console.log(table.toString());
    inquirer.prompt([
        {
            name: "product",
            message: "Which product # would you like to update?",
            type: "input",
            validate: function() {
                product.replace(/\D/g, "")
                if (!product || parseInt(product) > a.length || product < 1) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: "amount",
            message: "How many would you like to add?",
            type: "input"
            validate: function() {
                amount.replace(/\D/g, "");
                if (!amount) {
                    return false
                } else {
                    return true
                }
            }
        }
    ]).then(function(action) {

    })
}