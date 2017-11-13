# Node Js Pizza Project
Author : Valerian Pyckaert
Creation : 20/10/2017 

## Tutorials
### Part 1 : 
https://www.youtube.com/watch?v=kI4mpYGqX9s
### Part 2 : 
https://www.youtube.com/watch?v=kI4mpYGqX9s
### Part 3 : 
https://www.youtube.com/watch?v=G38CzghFtsI

## Deploy environnement :
'sudo apt-get update'
## MongoDB
'sudo apt-get install mongodb-org'

### Create tools for mongo
Create a file named mongod containing : 
'mongod --bind_ip=$IP --dbpath=data --nojdournal --rest "$@" '
'sudo chmod +x mongod'


## App Dependencies
### Express  - Server framework
npm i express --save 

### Body Parser
npm i body-parser --save

### Mongoose : Orm for MongoDB
npm i mongoose --save

### Socket.io
npm i socket.io --save

## Dev Dependencies
### Mocha : Unit test
npm i mocha --save-dev

### Chai : Unit test
npm i chai --save-dev

### Grunt
npm i grunt --save-dev
npm i grunt-cli --save-dev

### JS DOC
npm i grunt-jsdoc --save-dev

#Unit test
Run "npm test" in terminal