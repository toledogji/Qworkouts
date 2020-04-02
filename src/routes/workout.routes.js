const { Router } = require("express");

module.exports = function({ WorkoutController }){
    const router = Router();

    router.get("/:workoutId", WorkoutController.get);
    router.get("/", WorkoutController.getAll);
    router.get("/:workoutName/all", WorkoutController.getWorkoutsByName);
    router.get("/:userId/all", WorkoutController.getUserWorkouts);
    router.get("/:type/all", WorkoutController.getWorkoutsByType);
    router.get("/:difficulty/all", WorkoutController.getWorkoutsByDifficulty);
    router.post("/", WorkoutController.create);
    router.patch("/:workoutId", WorkoutController.update);
    router.delete("/:workoutId", WorkoutController.delete);
    router.post("/:workoutId/upvote", WorkoutController.upvoteWorkout);
    router.post("/:workoutId/downvote", WorkoutController.downvoteWorkout);

    return router;
}