# pizzaYnov
Tp pizza

## To install project :
'sudo apt-get update'
'sudo apt-get install mongodb-org'

#Create tools for mongo
#Create a file named mongod
'mongod --bind_ip=$IP --dbpath=data --nojdournal --rest "$@" '
'sudo chmod +x mongod'