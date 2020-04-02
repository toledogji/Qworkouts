let _workoutService;

class WorkoutController{

    constructor( { WorkoutService }){
        _workoutService = WorkoutService;
    }

    async get(req, res){
        const { workoutId } = req.params;
        const workout = await _workoutService.get(workoutId);
        return res.send(workout);
    }

    async getAll(req, res){
        const workouts = await _workoutService.getAll();
        return res.send(workouts);
    }

    async create(req, res){
        const { body } = req;
        const createdWorkout = await _workoutService.create(body);
        return res.status(201).send(createdWorkout);

    }

    async update(req, res){
        const { body } = req;
        const { workoutId } = req.params;
        const updatedWorkout = await _workoutService.update(workoutId, body);
        return res.send(updatedWorkout);
    }

    async delete(req, res){
        const { workoutId } = req.params;
        const deletedWorkout = await _workoutService.delete(workoutId);
        return res.send(deletedWorkout);
    }
    
    async getWorkoutsByName(req, res){
        const { workoutName } = req.params;
        const workouts = await _workoutService.getWorkoutByName(workoutName);
        return res.send(workouts);
    }

    async getUserWorkouts(req, res){
        const { userId } = req.params;
        const workouts = await _workoutService.getUserWorkouts(userId);
        return res.send(workouts);
    }

    async getWorkoutsByType(req, res){
        const { type } = req.params;
        const workouts = await _workoutService.getWorkoutsByType(type);
        return res.send(workouts);
    }

    async getWorkoutsByDifficulty(req, res){
        const { difficulty } = req.params;
        const workouts = await _workoutService.getWorkoutsByDifficulty(difficulty);
        return res.send(workouts);
    }

    async upvoteWorkout(req, res){
        const { workoutId } = req.params;
        const workout = await _workoutService.upvoteIdea(workoutId);
        return res.send(workout);
    }

    async downvoteWorkout(req, res){
        const { workoutId } = req.params;
        const workout = await _workoutService.downvoteIdea(workoutId);
        return res.send(workout);
    }
}

module.exports = WorkoutController;