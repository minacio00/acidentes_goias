const express = require ('express');
const {request, response} = require('express');
const routes = require('./routes');
const app = express();
const dotenv = require('dotenv');


const result = dotenv.config();
if (result.error) {
    throw result.error
    console.log(result.parsed);
}
app.use(express.json());
app.use(routes);



app.listen(3333);