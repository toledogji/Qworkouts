const { Router } = require("express");

module.exports = function({ ExerciseController }){
    const router = Router();

    router.get("/:exerciseId", ExerciseController.get);
    router.get("", ExerciseController.getAll);
    router.get("/:exerciseName/all", ExerciseController.getExercisesByName);
    router.get("/:muscular_group/all", ExerciseController.getExercisesByMuscularGroup);
    router.get("/:difficulty/all", ExerciseController.getExercisesByDifficulty);
    router.post("", ExerciseController.create);
    router.post("/addExercise/:exerciseId/:workoutId", ExerciseController.addExercise);
    router.patch("/:exerciseId", ExerciseController.update);
    router.delete("/:exerciseId", ExerciseController.delete);
 
    return router;
};