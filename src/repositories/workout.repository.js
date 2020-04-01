const BaseRepository = require('./base.repository');
let _workout = null;

class WorkoutRepository extends BaseRepository{
    constructor({ Workout }){
        super(Workout);
        _workout = Workout;
    }

    async getUserWorkouts(author){
        return await _workout.find({ author });
    }
    
    async getWorkout(workout){
        return await _workout.findOne({ workout })
    }

    async getWorkoutsByType(type){
        return await _workout.findOne({ type });
    }

    async getWorkoutsByDifficulty(difficulty){
        return await _workout.findOne({ difficulty });
    }
}

module.exports = WorkoutRepository;