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
        shopManage(res, table);
    })
};

var shopManage = function(item, table) {
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
                console.log("\033c", table.toString());
                whatNext();
            break;
            case "See Low Inventory":
                lowCheck(item);
            break;
            case "Update Stock":
                update(item,table);
            break;
            case "Add An Item":
                itemAdd(table);
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
            lowTable.push(([item[i].id, item[i].product_name, item[i].department_name, '$' + item[i].price, item[i].stock_quantity]))
        }
    }
    console.log(lowTable.toString());
    whatNext()
}

var update = function(a,table) {
    console.log("\033c");
    console.log(table.toString());
    inquirer.prompt([
        {
            name: "product",
            message: "Which product # would you like to update?",
            type: "input",
            validate: function(input) {
                var check = input.replace(/\D/g, "");
                if (!input || parseInt(input) > a.length || input < 1 || check === "") {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: "amount",
            message: "How many would you like to add?",
            type: "input",
            validate: function(input) {
                var check = input.replace(/\D/g, "");
                if (!input || check === "") {
                    return false
                } else {
                    return true
                }
            }
        }
    ]).then(function(action) {
        var itemIndex = action.product - 1;
        console.log("before query")
        connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [a[itemIndex].stock_quantity + parseInt(action.amount), a[itemIndex].id]), function(err) {
            console.log("ran")
            if (err) throw err;
        }
        whatNext()
    })
}

var itemAdd = function(table) {
    console.log("\033c", table.toString())
    inquirer.prompt([
        {
            name: "name",
            message: "What is the item called?",
            type: "input",
            validate: function(input) {
                if (!input) {
                    return false
                } else {
                    return true
                }
            }

        },
        {
            name: "department",
            message: "What department does it belong in?",
            type: "input",
            validate: function(input) {
                if (!input) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: "price",
            message: "How much should it cost?",
            type: "input",
            validate: function(input) {
                var check = input.replace(/\D/g, "");
                if (!input || check === "") {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: "quantity",
            message: "How many are in stock?",
            type: "input",
            validate: function(input) {
                var check = input.replace(/\D/g, "");
                if (!input || check === "") {
                    return false
                } else {
                    return true
                }
            }
        }

    ]).then(function(add){
        var newItem = {product_name: add.name, department_name: add.department, price: add.price, stock_quantity: add.quantity}
        connection.query("INSERT INTO products SET ?", newItem, function(err){
            if (err) throw err;
        })
        console.log(table.toString(), "Item Added")
        inquirer.prompt([
            {
                name: "again",
                message: "Would you like to enter another item?",
                type: "confirm"
            }
        ]).then(function(a) {
            switch (a.again){
                case true:
                    itemAdd(table);
                break;
                case false:
                    whatNext();
                break;
            }
        })
    })
}

var whatNext = function() {
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: ["Main Menu", "Exit"]
        }
    ]).then(function(req){
        switch(req.action){
            case "Main Menu":
                bamazonStart()
            break;
            case "Exit":
                process.exit()
            break;
        }
    })
}

bamazonStart()