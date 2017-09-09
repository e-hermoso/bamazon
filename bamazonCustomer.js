var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "VONzipper@55",
  database: "bamazon"
})
//after you create your connection object run the code below
connection.connect(function(err){
  if (err) throw err;
  // console.log('Connected as id: ' + connection.threadId);
  display();
})

var display = function(){
  connection.query('SELECT*FROM products', function(err, result){
    // console.log(result);
    inquirer.prompt({
      name: 'chooseProduct',
      type: 'list',
      choices: function(products){
        var choiceArray = [];
        for (var i = 0; i < result.length; i++){
          choiceArray.push(result[i].product_name);
          // console.log(choiceArray);
        }
        return choiceArray;
        // console.log("Selecting all products...\n");
      },
      message: '\nWelcome to Hack Bamazon \n' + 'Pick a product you will like to purchase\n'
    }).then(function(answer) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].product_name == answer.chooseProduct){
          var chosenItem = result[i];
          // console.log("LOOK AT ME : " + chosenItem);
          console.log(answer.chooseProduct);
          inquirer.prompt({ //then we ask the user for what they will like to bid
            name: "quantity",
            type: "input",
            message: "\n How many items will you like to purchase?",
            validate: function(value) { // we check if it is a number then we are going to the next step. >then(function)...
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }).then(function(answer) {
            if (answer.quantity <= chosenItem.stock_quantity) {
              // console.log("\nYou purchased " + answer.quantity + " " + chosenItem.product_name"\n");
              var totalRev = Number(answer.quantity)*Number(chosenItem.price) + Number(chosenItem.product_sales)
              var newStockQuantity = Number(chosenItem.stock_quantity) - Number(answer.quantity)
              // console.log(totalRev);
              connection.query("UPDATE products SET? Where?",[{
                  product_sales:  totalRev,
                  stock_quantity: newStockQuantity
                },{
                  product_name: chosenItem.product_name,
                   // we dont want the highestbid to be the lower than the startingbid number
                  // why do we put a function within a function with no var
                }],function(err,result){
                      // console.log(result);
                      console.log("\nYour transaction was submited successfully!");
                      console.log("\n THANK YOU come again!");
                      process.exit()
              })
            } else {
              console.log("Insufficient quantity!");
            }
          })
        }
      }
    })
  })
}
