const BaseService = require('./base.service');
let _exerciseRepository = null;
let _workoutRepository = null;
class ExerciseService extends BaseService{
    constructor({ ExerciseRepository, WorkoutRepository }){
        super(ExerciseRepository);
        _exerciseRepository = ExerciseRepository;
    }
    
    async getWorkoutExercises(workoutId){
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

        const { exercises } = workout;
        return exercises;
    }

    async getExcercise(exerciseName){
        const exercise = await _exerciseRepository.getExercise(exerciseName);

        if(!exercise){
            const error = new Error();
            error.stats = 404;
            error.message = "Exercise not found";
            throw error;
        }

        return exercise;
    }
    
    async getExercisesByMuscularGroup(muscular_group){
        if(!muscular_group){
            const error = new Error();
            error.status = 400;
            error.message = "Muscular group must be sent";
            throw error;
        }

        const exercises = await _exerciseRepository.getExercisesByMuscularGroup(muscular_group);

        if(!exercises){
            const error = new Error();
            error.stats = 404;
            error.message = "Exercises not found";
            throw error;
        }

        return exercises;
    }

    async getExercisesByDifficulty(difficulty){
        if(!difficulty){
            const error = new Error();
            error.status = 400;
            error.message = "Difficulty must be sent";
            throw error;
        }

        const exercises = await _exerciseRepository.getExercisesByDifficulty(difficulty);

        if(!exercises){
            const error = new Error();
            error.stats = 404;
            error.message = "Exercises not found";
            throw error;
        }

        return exercises;
    }

    async addExercise(exercise, workoutId){
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

        workout.exercises.push(exercise);

        return await _workoutRepository.update(workout, { exercises: workout.exercises });
    }
}

module.exports = ExerciseService;