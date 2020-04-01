const express = require('express');
const {celebrate,Segments,Joi} = require('celebrate');
const OngController = require('./controllers/OngsController');1
const incidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();
routes.post('/sessions',celebrate({
  
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
      

    }),
}),SessionController.index);
routes.get('/ongs',OngController.index);
routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization:Joi.string().required(),
    }).unknown(),
}),ProfileController.index);
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city:Joi.string().required(),
        uf:Joi.string().required().length(2)

    }),
}),OngController.create);
routes.get('/incidents',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index);
routes.post('/incidents',
celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization:Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        description: Joi.string().required(),       
        value:Joi.number().required()

    })
})
,
    incidentController.create);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
            id : Joi.number().required(),

    })
}),incidentController.delete);
module.exports= routes;