const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');

module.exports = function({ ExerciseController }){
    const router = Router();

    router.get("/:exerciseId", [AuthMiddleware], ExerciseController.get);
    router.get("",[AuthMiddleware, ParseIntMiddleware], ExerciseController.getAll);
    router.get("/:exerciseName/all", [AuthMiddleware], ExerciseController.getExercisesByName);
    router.get("/:muscular_group/all", [AuthMiddleware], ExerciseController.getExercisesByMuscularGroup);
    router.get("/:difficulty/all", [AuthMiddleware], ExerciseController.getExercisesByDifficulty);
    router.post("", [AuthMiddleware], ExerciseController.create);
    router.post("/addExercise/:exerciseId/:workoutId", [AuthMiddleware], ExerciseController.addExercise);
    router.patch("/:exerciseId", [AuthMiddleware], ExerciseController.update);
    router.delete("/:exerciseId", [AuthMiddleware], ExerciseController.delete);
 
    return router;
};