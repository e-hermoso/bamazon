# bamazon

The app will take in orders from customers and deplete stock from the store's inventory. It keeps track of product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Install packages thru gitbash or terminal along with cloning the files

```
git clone https://github.com/e-hermoso/bamazon.git

npm install inquirer

npm install mysql
```

## Running the tests

In order to run this application you must have node installed https://github.com/nodejs/node/wiki/Installation

### Running customer app 

Running this application will first display all of the items available for sale, including their ids, names, and prices. These products are stored in a databse table called products(SQL).

```
node bamazonCustomer.js
```
The image below shows the products on stock for the Customer.

![Alt text](images/customer.png?raw=true)

### Running Manager app 

Running this application will allow the Manager to choose from four options: View Product for Sales, View Low Inventory, Add to Inventory and Add New Products.
```
node bamazonManager.js
```
The image below shows when the Manager chooses View Products for Sales from the menu.

![Alt text](images/manager.png?raw=true)

### Running Supervisor app 

Running this application will allow the Supervisor View Product Sales by Department
as well as adding a new Department.
```
node bamazonSupervisor.js
```
The image below shows when a supervisor selects View Product Sales by Department, the app displays a summarized table in their terminal/bash window.

![Alt text](images/superVisor.png?raw=true)

## Authors

* **Eric Hermoso** - *Initial work* - [e-hermoso](https://github.com/e-hermoso)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
