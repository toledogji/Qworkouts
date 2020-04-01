const BaseRepository = require('./base.repository');
let _exercise = null;

class ExerciseRepository extends BaseRepository{
    constructor({ Exercise }){
        super(Exercise);
        _exercise = Exercise;
    }

    async getExercise(exercise){
        return await _exercise.findOne({ exercise })
    }

    async getExerciseByMuscularGroup(muscular_group){
        return await _exercise.findOne({ muscular_group });
    }

    async getExerciseByDifficulty(difficulty){
        return await _exercise.findOne({ difficulty });
    }
}

module.exports = ExerciseRepository;