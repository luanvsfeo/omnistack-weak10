const {Router} = require('express');
const DevControl = require('./controllers/DevController');
const searchControl = require('./controllers/SearchController');
const routes = Router();


routes.get('/devs',DevControl.index);
routes.post('/devs',DevControl.store);
routes.get('/search',searchControl.index);

module.exports = routes;