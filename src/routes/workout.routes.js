const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');

module.exports = function({ WorkoutController }){
    const router = Router();

    router.get("/:workoutId", [AuthMiddleware], WorkoutController.get);
    router.get("/", [AuthMiddleware, ParseIntMiddleware], WorkoutController.getAll);
    router.get("/:workoutName/all", [AuthMiddleware], WorkoutController.getWorkoutsByName);
    router.get("/:userId/all", [AuthMiddleware],WorkoutController.getUserWorkouts);
    router.get("/:type/all", [AuthMiddleware], WorkoutController.getWorkoutsByType);
    router.get("/:difficulty/all", [AuthMiddleware], WorkoutController.getWorkoutsByDifficulty);
    router.post("/", [AuthMiddleware], WorkoutController.create);
    router.patch("/:workoutId", [AuthMiddleware], WorkoutController.update);
    router.delete("/:workoutId", [AuthMiddleware], WorkoutController.delete);
    router.post("/:workoutId/upvote", [AuthMiddleware], WorkoutController.upvoteWorkout);
    router.post("/:workoutId/downvote", [AuthMiddleware], WorkoutController.downvoteWorkout);

    return router;
};