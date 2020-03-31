const mongoose = require('mongoose');
const { ExcerciseModel } = require('.')
const { Schema } = mongoose;

const WorkoutSchema = new Schema({
    workout: {type: String, required: true},
    description: {type: String},
    type: {type: String},
    difficulty: {type: String},
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "exercise", 
            required: true,
            autopopulate: true 
        }
    ],
    author: { 
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true,
        autopopulate: true 
    }
});

WorkoutSchema.plugin(require('mongoose-autopopulate')); 
module.exports = mongoose.model('workout', WorkoutSchema);