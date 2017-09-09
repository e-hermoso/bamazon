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

Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

```
node bamazonCustomer.js
```
The image below shows the products on stock for the Customer.

![Alt text](images/customer.png?raw=true)

### Running Manager app 

Running this application will all the Manager View Product Sales and Low Inventory
as well as adding to Inentory and new Products
```
node bamazonManager.js
```
The image below shows when the Manager chooses View Products from the menu.

![Alt text](images/manager.png?raw=true)

### Running Supervisor app 

Running this application will all the Supervisor View Product Sales by Department
as well as adding a new Department.
```
node bamazonSupervisor.js
```
The image below shows when a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

![Alt text](images/superVisor.png?raw=true)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Eric Hermoso** - *Initial work* - [e-hermoso](https://github.com/e-hermoso)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
