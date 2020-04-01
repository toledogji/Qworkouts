const { createContainer, asClass, asValue, asFunction } = require('awilix');
const config = require('../config');
const app = require('.');
//services
const { HomeService, UserService, WorkoutService, ExerciseService } = require('../services');
//controllers
const { HomeController } = require('../controllers');
//routes
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');
//models
const { UserModel, ExerciseModel, WorkoutModel } = require('../models');
//repositories
const { UserRepository, ExerciseRepository, WorkoutRepository } = require('../repositories');
const container = createContainer();

container
    .register({
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        app: asClass(app).singleton(),
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        ExerciseService: asClass(ExerciseService).singleton(),
        WorkoutService: asClass(WorkoutService).singleton(),
        HomeController : asClass(HomeController.bind(HomeController)).singleton(),
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserModel: asValue(UserModel),
        ExerciseModel: asValue(ExerciseModel),
        WorkoutModel: asValue(WorkoutModel),
        UserRepository: asClass(UserRepository).singleton(),
        WorkoutRepository: asClass(WorkoutRepository).singleton(),
        ExerciseRepository: asClass(ExerciseRepository).singleton()
    })

module.exports = container;
