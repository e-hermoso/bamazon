var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "VONzipper@55",
  database: "bamazon"
})
connection.connect(function(err){
  // console.log("Connected as id: " + connection.threadId);
  menuOption();
})
var choices = ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
var menuOption = function(){
  inquirer.prompt({
    name: "menu",
    type: "list",
    message: "Select an option from thr menu? \n",
    choices: choices
  }).then(function(answer){
    if (answer.menu === choices[0]){
      viewProductsSale();
    }else if (answer.menu === choices[1]){
      viewLowInventory();
    }else if (answer.menu === choices[2]) {
      addToInventory();
    }else {
      addNewProduct();
    }
  })
}

var viewProductsSale = function(){
  console.log("\nProducts that are on SALE\n");
  connection.query('SELECT*FROM products', function(err, result){
    var Table = require('cli-table2');
    // instantiate
    var table = new Table({
      head: ['ITEM_ID', 'PRODUCT', 'PRICE', 'STOCK QTY'],
      colWidths: [20, 20, 20, 20]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (var i = 0; i < result.length; i++){
    table.push(
      [result[i].item_id, result[i].product_name, result[i].price, result[i].stock_quantity]
      );
    }
    console.log(table.toString())
    process.exit()
  })
}

var viewLowInventory = function(){
  console.log("\nThis Table shows the quantity of products less the 5\n");
  connection.query('SELECT*FROM products', function(err, result){
    var Table = require('cli-table2');
    // instantiate
    var table = new Table({
      head: ['ITEM_ID', 'PRODUCT', 'PRICE', 'STOCK QTY'],
      colWidths: [20, 20, 20, 20]
    });
    for (var i = 0; i < result.length; i++) {
      if(result[i].stock_quantity < 5){
        table.push(
          [result[i].item_id, result[i].product_name, result[i].price, result[i].stock_quantity]
          );
      }
    }
    console.log(table.toString())
    process.exit()
  })

}

var addToInventory = function(){
  connection.query('SELECT*FROM products', function(err, result){
  console.log("add new also works");
  inquirer.prompt([{
      name: "product",
      type: "list",
      choices: function(products){
        var choiceArray = [];
        for (var i = 0; i < result.length; i++){
          choiceArray.push(result[i].product_name);
          // console.log(choiceArray);
        }
        return choiceArray;
        // console.log("Selecting all products...\n");
      },
      message: "what product will you like to add inventory to?"
  },{
      name: "quantity",
      type: "input",
      message: "how many items would you like to add?"
  // use the connection to my SQL to insert this new data into our database (connection.query("INSERT INTO auction SET?",{...})
// example below show you how to insert in sql
// -- Creates new rows containing data in all named columns --
// INSERT INTO people (name, has_pet, pet_name, pet_age)
// VALUES ("Ahmed", TRUE, "Rockington", 100);
}]).then(function(answer){
  for (var i = 0; i < result.length; i++) {
    if (result[i].product_name == answer.product) {
      var chosenProduct = result[i];
      // console.log(result[i]); this display the choosen item stored
      console.log("======== " + chosenProduct.stock_quantity);
      // console.log(Number(chosenProduct.stock_quantity) + Number(answer.quantity));
      var quantityAdded = Number(chosenProduct.stock_quantity) + Number(answer.quantity)
        connection.query("UPDATE products SET? Where?",[{
            stock_quantity:  quantityAdded
          },{
            product_name: answer.product,

          }],function(err,result){
                // console.log(result);
                console.log("\nYou added " + answer.quantity + " quantity successfully!");
                process.exit()
        })
      }
    }
  })
})
}

var addNewProduct = function(){
  console.log("add is working");
  inquirer.prompt([{
      name: "product",
      type: "input",
      message: "what product will you like to add?"
  },{
      name: "quantity",
      type: "input",
      message: "how many items would you like to add?"
  },{
      name: "department",
      type: "input",
      message: "What department does the product belong too?"
  },{
      name: "price",
      type: "input",
      message: "set your price",
      validate: function(value){ // understand validate function
        if(isNaN(value)==false){
            return true;
    } else{
        return false;
    }
  }

}]).then(function(answer){
    connection.query("INSERT INTO products SET?",{
        product_name: answer.product,
        stock_quantity: answer.quantity,
        department_name: answer.department,
        price: answer.price
      },function(err,result){
            // console.log(result);
            console.log("Your new Product was updated successfully!");
            process.exit()
    })
  })
}
