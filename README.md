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
### User Endpoints  

HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/user/signup | True | Create a new user
POST | /api/v1/user/sign | True | Login the user
GET | /api/v1/user/agent | True | get all users as agents with their informations available
PUT | /api/v1/user//updateinformation | False  | Edit user information
PUT | /api/v1/user//changepassword | False  | Change password
PUT | /api/v1/user//changeavatar | False  | Change avatar

### Property Endpoints  

HTTP Method|End point | Public Access|Action
-----------|----------|--------------|------
POST | /api/v1/property/create | False | Post an advert - publish
GET | /api/v1/property/ | True | Get all adverts properties
GET | /api/v1/property/view/<property_id> | True | Get a specific property
GET | /api/v1/property/agent | False | Agent account - Get all his properties
GET | /api/v1/property/agent/trade | False | Get all adverts properties mark as trade for the agent
PATCH | /api/v1/property/update/<property_id> | True | Edit a  property
PATCH | /api/v1/property/delete/<property_id> | True | Delete a  property
PATCH | /api/v1/property/trade/<property_id> | True | Mark a property as trade
PATCH | /api/v1/property/untrade/<property_id> | True | Mark a property as untrade
GET | /api/v1/property/filter/?location=<location>&type=<type>&bathrooms=<bathrooms>&bedrooms<bedrooms> | True | Filter and search Result 
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
