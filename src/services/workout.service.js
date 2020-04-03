const BaseService = require('./base.service');
let _workoutRepository = null;

class WorkoutService extends BaseService {
    constructor({ WorkoutRepository }){
        super(WorkoutRepository);
        _workoutRepository = WorkoutRepository;
    } 
    
    async getUserWorkouts(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message = "Author must be sent";
            throw error;
        }

        const workouts = await _workoutRepository.getUserWorkouts(author);

        if(!workouts){
            const error = new Error();
            error.stats = 404;
            error.message = "Workouts not found";
            throw error;
        }

        return workouts;
        
    }
    
    async getWorkoutsByType(type){
        if(!type){
            const error = new Error();
            error.status = 400;
            error.message = "Type must be sent";
            throw error;
        }

        const workouts = await _workoutRepository.getWorkoutsByType(type);

        if(!workouts){
            const error = new Error();
            error.stats = 404;
            error.message = "Workouts not found";
            throw error;
        }

        return workouts;
    }

    async getWorkoutsByDifficulty(difficulty){
        if(!difficulty){
            const error = new Error();
            error.status = 400;
            error.message = "Difficulty must be sent";
            throw error;
        }

        const workouts = await _workoutRepository.getWorkoutsByDifficulty(difficulty);

        if(!workouts){
            const error = new Error();
            error.stats = 404;
            error.message = "Workouts not found";
            throw error;
        }

        return workouts;
    }

    async addExercise(exerciseId, workoutId){
        if(!workoutId){
            const error = new Error();
            error.status = 400;
            error.message = "Workout must be sent";
            throw error;
        }

        const workout = await _workoutRepository.get(workoutId);

        if(!workout){
            const error = new Error();
            error.stats = 404;
            error.message = "Workout not found";
            throw error;
        }

        workout.exercises.push(exerciseId);

        return await _workoutRepository.update(workout, { exercises: workout.exercises });
    }
    
    async upvoteWorkout(workoutId){
        if(!workoutId){
            const error = new Error();
            error.stats = 400;
            error.message = "Workout must be sent";
            throw error;
        }

        const workout = await _workoutRepository.get(workoutId);

        if(!workout){
            const error = new Error();
            error.stats = 404;
            error.message = "Workout not found";
            throw error;
        }

        workout.upvotes.push(true);

        return await _workoutRepository.update(workoutId, { upvotes: workout.upvotes });
    }

    async downvoteWorkout(workoutId){
        if(!workoutId){
            const error = new Error();
            error.stats = 400;
            error.message = "Workout must be sent";
            throw error;
        }

        const workout = await _workoutRepository.get(workoutId);

        if(!workout){
            const error = new Error();
            error.stats = 404;
            error.message = "Workout not found";
            throw error;
        }

        workout.downvotes.push(true);

        return await _workoutRepository.update(workoutId, { downvotes: workout.downvotes });
    }
}

module.exports = WorkoutService;