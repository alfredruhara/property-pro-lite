[![Build Status](https://travis-ci.org/alfredruhara/property-pro-lite.svg?branch=develop)](https://travis-ci.org/alfredruhara/property-pro-lite)
[![Coverage Status](https://coveralls.io/repos/github/alfredruhara/property-pro-lite/badge.svg)](https://coveralls.io/github/alfredruhara/property-pro-lite)

# Property Pro Lite
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Getting Started 
To get the project up and running on your local machine, please follow these instructions.
### Prerequisites
Make sure you have node -v 10 and above installed Or follow these steps to install node

Node installation on OS X

```
$ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)" 
```
Node installation on Linux

```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
Node installation on Windows

Download the intaller from the [official Node.js website](http://nodejs.org/) 

### Clone the project from github

$ git clone https://github.com/alfredruhara/property-pro-lite

### Install the required dependencies found in package.json

```
 $ npm install
```

### Start the server

```
 $ npm start
```

### Running the tests

Testing and Getting the code coverage report with nyc
```
 $ npm test
```
Testing the code style with eslint
```
 $ ./node_modules/.bin/eslint server
```
### User Endpoints  : /api/v1/user

Method|End point | Public |Action
-----------|----------|--------------|------
POST | /signup | True | Create a new user
POST | /sign | True | Login the user
GET | /agent | True | get all users as agents with their informations available
PUT | /updateinformation | False  | Edit user information
PUT | /changepassword | False  | Change password
PUT | /changeavatar | False  | Change avatar

### Property Endpoints  : /api/v1/property

Method|End point | Public |Action
-----------|----------|--------------|------
POST | /create | False | Post an advert - publish
GET | / | True | Get all adverts properties
GET | /view/:id | True | Get a specific property
GET | /agent | False | Agent account - Get all his properties
GET | /agent/trade | False | Get all adverts properties mark as trade for the agent
PATCH | /update/:id | False | Edit a  property
PATCH | /delete/:id | False | Delete a  property
PATCH | /trade/:id | False | Mark a property as trade
PATCH | /untrade/:id | False | Mark a property as untrade
GET | /filter/?location=<location>&type=<type>&bathrooms=<bathrooms>&bedrooms<bedrooms> | True | Filter and search Result 
### Deployment

The application template is hosted on github pages
<a href="https://alfredruhara.github.io/property-pro-lite/UI/"> https://alfredruhara.github.io/property-pro-lite/UI/ </a> <br/>
<ul>
  <li> Use any email and password to access other pages </li>
  <li> Interact with the application template to discover other activities </li> 
</ul>

### Management 

The development phases of the project (project stories) are on pivotaltracker
 : <a href="https://www.pivotaltracker.com/n/projects/2354593"> https://www.pivotaltracker.com/n/projects/2354593 </a> 

### Author
<ul>
  <li> Chadrack ruhara  </li>
 </ul>

### License
This project is licensed under the MIT License 
