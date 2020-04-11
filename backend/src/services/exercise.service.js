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

    async getExercisesByMuscleGroup(muscle_group){
        if(!muscle_group){
            const error = new Error();
            error.status = 400;
            error.message = "Muscle group must be sent";
            throw error;
        }
        const exercises = await _exerciseRepository.getExercisesByMuscleGroup(muscle_group);

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

}

module.exports = ExerciseService;