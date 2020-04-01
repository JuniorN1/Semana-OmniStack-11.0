const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');
const app= express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports =app;



/**
 * rota / recurso
 */
/**
 * metodos http
 * 
 * GET : Buscar uma informação do back-end
 * POST: Criar uma informação no back-ind
 * PUT: alterar uma informação no back-end
 * DELETE: deletar uma informaçao no back-end
 */

 /**
  * tipos de paramentros
  * 
  *  request.Query  Params: Parametros nomeados enviados na rota apos "?" (filtros,paginacao)
  * Route  request.Params: Parametros Ultilizados para identificar recursos
  * Request  request.Body: Corpo d requisição, ultilizado para criar ou alterar recursos
  */
/**
 * sq
 */
/**
 * Drive:select * from users
 * Query Builder:tabela(usuario).select(*).where()
 */

