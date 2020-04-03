const BaseRepository = require('./base.repository');
let _workout = null;

class WorkoutRepository extends BaseRepository{
    constructor({ WorkoutModel }){
        super(WorkoutModel);
        _workout = WorkoutModel;
    }

    async getUserWorkouts(author){
        return await _workout.find({ author });
    }
    
    async getWorkoutsByType(type){
        return await _workout.find({ type });
    }

    async getWorkoutsByDifficulty(difficulty){
        return await _workout.find({ difficulty });
    }
}

module.exports = WorkoutRepository;