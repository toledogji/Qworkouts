const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');

module.exports = function({ ExerciseController }){
    const router = Router();

    router.get("/:exerciseId", [AuthMiddleware], ExerciseController.get);
    router.get("",[AuthMiddleware, ParseIntMiddleware], ExerciseController.getAll);
    router.get("/muscleGroup/:muscle_group", [AuthMiddleware], ExerciseController.getExercisesByMuscleGroup);
    router.get("/difficulty/:difficulty", [AuthMiddleware], ExerciseController.getExercisesByDifficulty);
    router.post("", [AuthMiddleware], ExerciseController.create);
    router.patch("/:exerciseId", [AuthMiddleware], ExerciseController.update);
    router.delete("/:exerciseId", [AuthMiddleware], ExerciseController.delete);
 
    return router;
};