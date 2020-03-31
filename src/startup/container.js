const { createContainer, asClass, asValue, asFunction } = require('awilix');
const config = require('../config');
const app = require('.');
//services
const { HomeService } = require('../services');
//controllers
const { HomeController } = require('../controllers');
//routes
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

const container = createContainer();

container
    .register({
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        app: asClass(app).singleton(),
        HomeService: asClass(HomeService).singleton(),
        HomeController : asClass(HomeController.bind(HomeController)).singleton(),
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })

module.exports = container;
