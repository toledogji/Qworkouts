const { createContainer, asClass, asValue, asFunction } = require('awilix');
const config = require('../config');
const app = require('.');
//Services
const { HomeService, UserService, ExerciseService, WorkoutService, AuthService } = require('../services');
//Controllers
const { HomeController, UserController, ExerciseController, WorkoutController, AuthController } = require('../controllers');
//Routes
const { HomeRoutes, UserRoutes, ExerciseRoutes, WorkoutRoutes, AuthRoutes } = require('../routes/index.routes');
const Routes = require('../routes');
//Models
const { UserModel, ExerciseModel, WorkoutModel } = require('../models');
//Repositories
const { UserRepository, ExerciseRepository, WorkoutRepository } = require('../repositories');
const container = createContainer();

container
    .register({
        router: asFunction(Routes).singleton(),
        config: asValue(config),
        app: asClass(app).singleton(),
        //Services
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        ExerciseService: asClass(ExerciseService).singleton(),
        WorkoutService: asClass(WorkoutService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        //Controllers
        HomeController : asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        ExerciseController: asClass(ExerciseController.bind(ExerciseController)).singleton(),
        WorkoutController: asClass(WorkoutController.bind(WorkoutController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        //Routes
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        ExerciseRoutes: asFunction(ExerciseRoutes).singleton(),
        WorkoutRoutes: asFunction(WorkoutRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        //Models
        UserModel: asValue(UserModel),
        ExerciseModel: asValue(ExerciseModel),
        WorkoutModel: asValue(WorkoutModel),
        //Repositories
        UserRepository: asClass(UserRepository).singleton(),
        ExerciseRepository: asClass(ExerciseRepository).singleton(),
        WorkoutRepository: asClass(WorkoutRepository).singleton(),

    })

module.exports = container;
