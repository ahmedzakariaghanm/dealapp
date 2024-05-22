# DEALAPP

## Usage
To get started, make sure you have Nodejs and mongoDB installed on your system, and then clone this repository.
### in first time
you will need to import sampleDB into your mongoDB 
### ***In Development Mode***
```sh
npm i 
```
then
```sh
nodemon index.js
```
### ***API Running On***
```sh
http://localhost:3000/
```

### ***Documentation On***
```sh
http://localhost:3000/api-docs/
```




you can use this end point to login 
```sh
localhost:3000/login
```
```sh
system has 3 users 
1 - ADMIN 
{
    "password":"password",
    "phone":"01211111111"
}
2 - AGENT
{
    "password":"password",
    "phone":"01111111111"
}
3 - CLIENT
{
    "password":"password",
    "phone":"01011111111"
}
```