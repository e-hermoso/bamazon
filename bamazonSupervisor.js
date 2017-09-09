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
var choices = ["View Product Sales by Department","Create New Department"]
var menuOption = function(){
  inquirer.prompt({
    name: "menu",
    type: "list",
    message: "Select an option from thr menu \n",
    choices: choices
  }).then(function(answer){
    if(answer.menu === choices[0]){
      viewSalesbyDep();
    }else{
      createNewDep();
    }
  })
}

var viewSalesbyDep = function(){
  console.log("yolo");
  connection.query('SELECT Departments.department_id, Departments.department_name, Departments.over_head_costs, SUM(Products.product_sales) AS deptSalesSum, SUM(Products.product_sales) - Departments.over_head_costs AS totalProfit FROM Products Left JOIN Departments ON Departments.department_name = Products.department_name GROUP BY Departments.department_name, Departments.department_id ORDER BY Departments.department_id', function(err, result){
      // console.log(result);
      var Table = require('cli-table2');

      // instantiate
      var table = new Table({
        head: ['Department ID', 'Department Name', 'Over Head Costs', 'Product Sales', 'Total Profit'],
        colWidths: [20, 20, 20, 20, 20]
      });

      // table is an Array, so you can `push`, `unshift`, `splice` and friends
      for (var i = 0; i < result.length; i++){
      table.push(
        [result[i].department_id, result[i].department_name, result[i].over_head_costs, result[i].deptSalesSum, result[i].totalProfit]
      );
    }
    console.log(table.toString())
    process.exit()
  })
}

var createNewDep = function(){
  console.log("swag");
  inquirer.prompt([{
    name: "department",
    type: "input",
    message: "What is the name of the new Department you want to add? \n"
  }]).then(function(answer){
    connection.query("INSERT INTO Departments SET?",{
      department_name: answer.department,
      over_head_costs: 1000
    },function(err,result){
      console.log(answer.department + " department was added successfully");
      process.exit()
    })
  })
}
