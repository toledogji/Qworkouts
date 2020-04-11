const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware} = require('../middlewares');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({ HomeRoutes, UserRoutes, ExerciseRoutes, WorkoutRoutes, AuthRoutes }){
    const router = express.Router()
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());
    
    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/exercise", ExerciseRoutes);
    apiRoutes.use("/workout", WorkoutRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    
    router.use("/api/v1", apiRoutes);
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}