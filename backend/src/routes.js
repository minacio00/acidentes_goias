const { json } = require('express');
const express = require('express');
const { Knex } = require('knex');
const routes = express.Router();
const database = require('./database/db');

routes.get('/api/',async (req,res)=>{
   const acidentes = await database('acidentes_2')
   .select(['acidentes.id','latitude','longitude','municipio.nome','causa','uf.uf'])
   .from('acidentes')
   // .whereRaw('acidentes.uf_id = uf.id')
   .join('uf','uf.id','=','acidentes.uf_id')
   .join('municipio','municipio.id','=','acidentes.municipio_id')
   // .orderBy('municipio.nome','asc')
   



   // .limit(70);
   return (res.json(acidentes));
  
})

routes.get('/city',async (req,res)=>{
   // const municipio = req.body.municipio.toUpperCase();
   const acidentes = await database('acidentes')
   .select('municipio').where('uf', '=','GO').groupBy('municipio').orderBy('municipio','asc')
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