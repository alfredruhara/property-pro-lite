[![Build Status](https://travis-ci.org/alfredruhara/property-pro-lite.svg?branch=develop)](https://travis-ci.org/alfredruhara/property-pro-lite)
[![Coverage Status](https://coveralls.io/repos/github/alfredruhara/property-pro-lite/badge.svg)](https://coveralls.io/github/alfredruhara/property-pro-lite)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c8235a5d222b0ba2609/maintainability)](https://codeclimate.com/github/alfredruhara/property-pro-lite/maintainability)
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

### Work break down structure 

```
- User 
  - Home page
  - Specific Property page
  - Agents page
  - Sign and Sign up pages
  
- Agent
  - Own Properties page
  - Create AD page
  - Edit property page
  - Trade page
  - Profile page
```


### User Endpoints  : /api/v1/

Method|End point | Public |Action
-----------|----------|--------------|------
GET | user/ | True | get all users as agents with their informations available
POST | auth/signup | True | Create a new user
POST | auth/sign | True | Login the user
PATCH | user/ | False  | Edit user information
PATCH | user/changepassword | False  | Change password
PATCH | user/changeavatar | False  | Change avatar

### Property Endpoints  : /api/v1/

Method|End point | Public |Action
-----------|----------|--------------|------
POST | property/ | False | Post an advert - publish
PATCH | update/:id | False | Edit a  property
DELETE | property/:id' | False | Delete a  property
PATCH | property/:id/sold | False | Mark a property as trade
PATCH | property/:id/unsold | False | Mark a property as untrade
GET | property/ | True | Get all adverts properties
GET | property/view/<property_id> | True | Get a specific property
GET | property/agent | False | Agent account - Get all his properties
GET | property/agent/sold | False | Get all adverts properties mark as trade for the agent
GET | property/filter/?location=<location>&type=<type>&bathrooms=<bathrooms>&bedrooms<bedrooms> | True | Filter and search Result 

### API Official documentation 
 The official documenation of the API can be found at : 
 <a href="https://property-lite-pro.herokuapp.com/api-docs/"> https://property-lite-pro.herokuapp.com/api-docs/ </a>

### Deployment

The application template is hosted on github pages
<a href="https://alfredruhara.github.io/property-pro-lite/UI/"> https://alfredruhara.github.io/property-pro-lite/UI/ </a> <br/>
<ul>
  <li> Use any email and password to access other pages </li>
  <li> Interact with the application template to discover other activities </li> 
</ul>

The application server has been hosted on Heruku: 
   - https://property-lite-pro.herokuapp.com/api/v1/auth/signup

### Management 

The development phases of the project (project stories) are on pivotaltracker
 : <a href="https://www.pivotaltracker.com/n/projects/2354593"> https://www.pivotaltracker.com/n/projects/2354593 </a> 

### Author
<ul>
  <li> Chadrack ruhara  </li>
 </ul>

### License
This project is licensed under the MIT License 

### Acknowledgments
 
 - My thanks goes to my learning facilitators and team members
