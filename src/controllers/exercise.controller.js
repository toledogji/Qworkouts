let _exerciseService;

class ExerciseController{

    constructor( { ExerciseService }){
        _exerciseService = ExerciseService;
    }

    async get(req, res){
        const { exerciseId } = req.params;
        const exercise = await _exerciseService.get(exerciseId);
        return res.send(exercise);
    }

    async getAll(req, res){
        const { pageSize, pageNum } = req.query;
        const exercises = await _exerciseService.getAll(pageSize, pageNum);
        return res.send(exercises);
    }

    async create(req, res){
        const { body } = req;
        const createdExercise = await _exerciseService.create(body);
        return res.status(201).send(createdExercise);

    }
    
    async update(req, res){
        const { body } = req;
        const { exerciseId } = req.params;
        const updatedExercise = await _exerciseService.update(exerciseId, body);
        return res.send(updatedExercise);
    }

    async delete(req, res){
        const { exerciseId } = req.params;
        const deletedExercise = await _exerciseService.delete(exerciseId);
        return res.send(deletedExercise);
    }
    
    async getWorkoutExercises(req, res){
        const { workoutId } = req.params;
        const exercises = await _exerciseService.getWorkoutExercises(workoutId);
        return res.send(exercises);
    }

    async getExercisesByMuscularGroup(req, res){
        const { muscular_group } = req.params;
        const exercises = await _exerciseService.getExercisesByMuscularGroup(muscular_group);
        return res.send(exercises);
    }

    async getExercisesByDifficulty(req, res){
        const { difficulty } = req.params;
        const exercises = await _exerciseService.getExercisesByDifficulty(difficulty);
        return res.send(exercises);
    }
 
}

module.exports = ExerciseController;