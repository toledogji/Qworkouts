const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');

module.exports = function({ WorkoutController }){
    const router = Router();

    router.get("/:workoutId", [AuthMiddleware], WorkoutController.get);
    router.get("/", [AuthMiddleware, ParseIntMiddleware], WorkoutController.getAll);
    router.get("/user/:userId", [AuthMiddleware],WorkoutController.getUserWorkouts);
    router.get("/type/:type", [AuthMiddleware], WorkoutController.getWorkoutsByType);
    router.get("/difficulty/:difficulty", [AuthMiddleware], WorkoutController.getWorkoutsByDifficulty);
    router.post("/", [AuthMiddleware], WorkoutController.create);
    router.patch("/:workoutId", [AuthMiddleware], WorkoutController.update);
    router.delete("/:workoutId", [AuthMiddleware], WorkoutController.delete);
    router.post("/upvote/:workoutId", [AuthMiddleware], WorkoutController.upvoteWorkout);
    router.post("/downvote/:workoutId", [AuthMiddleware], WorkoutController.downvoteWorkout);
    router.post("/addExercise/:exerciseId/:workoutId", [AuthMiddleware], WorkoutController.addExercise);

    return router;
};