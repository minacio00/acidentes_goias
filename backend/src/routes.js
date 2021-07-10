const { json } = require('express');
const express = require('express');
const routes = express.Router();
const database = require('./database/db');

routes.get('/api/',async (req,res)=>{
   const acidentes = await database('acidentes')
   .select(['id','latitude','longitude'])
   .where('uf', '=','GO')
   // .limit(50);
   return res.json(acidentes) 
})

routes.get('/city',async (req,res)=>{
   // const municipio = req.body.municipio.toUpperCase();
   const acidentes = await database('acidentes')
   .select('municipio').where('uf', '=','GO').groupBy('municipio')
   // .where('municipio', '=',municipio)
   return res.json(acidentes);
})

routes.get('/filterByCity/:municipio',async (req,res)=>{
   // console.log(req.params.municipio)
   const acidentes = await database('acidentes')
   .select(['id','latitude','longitude'])
   .where('municipio','=',req.params.municipio.toUpperCase());
   return res.json(acidentes);
})

module.exports = routes;