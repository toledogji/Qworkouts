const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExcerciseSchema = new Schema({
    excercise: {type: String, required: true},
    description: {type: String, required: true},
    difficulty: {type: String},
    muscular_group: {type: [String]},
    equipment: {type: String},
}) 


module.exports = mongoose.model('excercise', ExcerciseSchema);