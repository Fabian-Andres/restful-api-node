# Oiga-node

## System requirements

-  [NodeJS](https://nodejs.org/en/ "NodeJs").
-  [MongoDB](https://www.mongodb.com/ "NodeJs").
-  [Npm](https://www.npmjs.com/ "Npm") o [Yarn](https://yarnpkg.com/en/ "Yarn").

## Installation

To carry out the installation of the project, the following steps must be carried out:

### Clone Repository.

To clone the application, run this command on your terminal:

    git clone https://github.com/Fabian-Andres/oiga-node.git


### Configure and download dependencies
With the following command the libraries of the package.json will be installed, for the project:


Being in  `cd /oiga-node`

- Install the dependencies with

```
$ npm install
```

- Start the mongo database in another console tab with

```
$ sudo mongod
```

- Now start the application with

```
$ npm start
```

- To perform the unit test use

```
$ npm test
```

Now we have our application running on the route:

```
http://localhost:3001/api
```

Endpoints

- /signup
- /signin
- /products
- /orders

## Requests of the api Rest

Now we will use **Postman** to populate our database:

- User register `method: POST`

```
http://localhost:3001/api/signup
```

We insert our JSON and send

```
{
   "email": "admin@acunetiz.com",
   "displayName": "Acunetiz",
   "password": "pass",
   "type": "ADMIN_ROLE"
}
```


- User login `method: POST`

```
http://localhost:3001/api/signin
```

We insert our JSON and send

```
{
   "email": "admin@acunetiz.com",
   "password": "pass"
}
```

- Products

To make these requests we must have our **Token** that is generated in the login, and send it through our **Headers**.

`Authorization: Barer [our_token]`

**Create** `method: POST`

```
http://localhost:3001/api/products
```

We insert our JSON and send

```
{
   "name": "Product 1",
   "price": 1500,
   "description": "Lorem ipsum",
   "category": "accesories"
}
```

**Get all products** `method: GET`

```
http://localhost:3001/api/products
```
 
And send

**Get one product** `method: GET`

```
http://localhost:3001/api/products/:productId
```
 
And send

**Update** `method: PUT`


```
http://localhost:3001/api/products/:productId
```

We insert our JSON and send

```
{
   "name": "Product 1",
   "price": 2000,
   "description": "Lorem ipsum",
   "category": "phones"
}
```

**Delete** `method: DELETE`

```
http://localhost:3001/api/products/:productId
```
 
And send

- Orders

To make these requests we must have our **Token** that is generated in the login, and send it through our **Headers**.

`Authorization: Barer [our_token]`

**Create** `method: POST`

```
http://localhost:3001/api/orders
```

We insert our JSON and send

```
{
   "name": "Acunetiz order",
   "products": [
      {"id": "5baa8291374481093dc5c5b5", "qty": 5},
      {"id": "5baa829c374481093dc5c5b6", "qty": 3}
   ]
}
```


**Get all orders** `method: GET`

```
http://localhost:3001/api/orders
```
 
And send

**Get one order** `method: GET`

```
http://localhost:3001/api/orders/:orderId
```
 
And send

**Delete** `method: DELETE`

```
http://localhost:3001/api/orders/:orderId
```
 
And send


## Author

Fabian Andres Riascos @fabian-andres
