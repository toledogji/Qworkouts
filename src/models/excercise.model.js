const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    difficulty: {type: String},
    muscular_group: {type: [String]},
    equipment: {type: String},
    videoLink: {type: String}
}) 


module.exports = mongoose.model('exercise', ExerciseSchema);