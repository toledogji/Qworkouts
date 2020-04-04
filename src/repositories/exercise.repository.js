const BaseRepository = require('./base.repository');
let _exercise = null;

class ExerciseRepository extends BaseRepository{
    constructor({ ExerciseModel }){
        super(ExerciseModel);
        _exercise = ExerciseModel;
    }

    async getExercisesByMuscleGroup(muscle_group){
        return await _exercise.find({ muscle_group });
    }

    async getExercisesByDifficulty(difficulty){
        return await _exercise.find({ difficulty });
    }
}

module.exports = ExerciseRepository;