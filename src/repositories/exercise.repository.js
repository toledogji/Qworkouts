const BaseRepository = require('./base.repository');
let _exercise = null;

class ExerciseRepository extends BaseRepository{
    constructor({ ExerciseModel }){
        super(ExerciseModel);
        _exercise = ExerciseModel;
    }

    async getExercisesByName(exerciseName){
        return await _exercise.find({ exerciseName })
    }

    async getExerciseByMuscularGroup(muscular_group){
        return await _exercise.find({ muscular_group });
    }

    async getExerciseByDifficulty(difficulty){
        return await _exercise.find({ difficulty });
    }
}

module.exports = ExerciseRepository;