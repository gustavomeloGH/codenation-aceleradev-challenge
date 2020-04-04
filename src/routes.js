const express = require('express');
const routes = express.Router();
const controller = require('./controllers/CryptographyController');

module.exports = routes;

/** 
 * Rota para obter os dados iniciais
 */
routes.get(
    '/generate-initial-data',
    controller.generateInitialAnswerFile
);

/** 
 * Rota para submeter a atividade
 */
routes.get(
    '/submit',
    controller.submit
);