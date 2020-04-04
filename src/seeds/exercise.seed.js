var mongoose = require("mongoose");
var MONGO_URI  = "mongodb+srv://toledogji:magster@cluster0-mcv5a.gcp.mongodb.net/qworkouts?retryWrites=true&w=majority";
const axios = require("axios").default;
const cheerio = require("cheerio");
const { ExerciseModel }  = require("../models");
const difficulties = ["beginner", "intermediate", "advanced"];
const equipment_keywords = ["hanging", "rope", "pull", "ropes", "flag", "australian", "elevated", "paralletes", "dip", "dips", "box", "vest", "dumbbell", "db", "barbell", "bench", "band", "bands", "chin"];
const equipment_keyword_map = {
    vest: "weight vest",
    band: "resistance band",
    bands: "resistance band",
    db: "dumbell",
    dip: "dip bar",
    dips: "dip bar",
    australian: "low bar",
    elevated: "box",
    flag: "pole",
    hanging: "pull up bar",
    ropes: "jump rope",
    rope: "jump rope",
    pull: "pull up bar",
    chin: "pull up bar"
};
const muscle_keyword_map = {
    dumbbell: ["biceps"],
    australian: ["biceps", "back"],
    pull: ["biceps", "back"],
    chin: ["biceps"],
    dips: ["triceps"],
    flag: ["abs"],
    "l-sit": ["abs"],
    plank: ["abs"],
    squat: ["legs"],
    squats: ["legs"],
    lunge: ["legs"],
    lunges: ["legs"],
    handstand: ["shoulders"]
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( async function getBooks() {
    let exerciseIndex = 1;
    let exercises = [];

    while(exerciseIndex < 684) {
        const exerciseLink = "https://www.thenx.com/exercises/" + exerciseIndex;
        try{
            const htmlExercise = await axios.get(exerciseLink);
            let $ = cheerio.load(htmlExercise.data);
            const exerciseName = $(".card-header").text().trim();
            const exerciseVideoLink = $("iframe").first().attr("src");
            const htmlExerciseVideo = await axios.get(exerciseVideoLink);
            const baseVimeoUrlVideo = "https://i.vimeocdn.com/video/";
            let thumbIndex = htmlExerciseVideo.data.search(baseVimeoUrlVideo);
            const slicedThumbnailUrl = htmlExerciseVideo.data.slice(thumbIndex, thumbIndex + baseVimeoUrlVideo.length + 20);
            const exerciseThumbnail = slicedThumbnailUrl.slice(0, slicedThumbnailUrl.indexOf('?'));

            let exerciseDifficulty = difficulties.filter( (difficulty) => {
                return exerciseName.toLowerCase().includes(difficulty);
            })[0];
            let exerciseEquipment = equipment_keywords.filter( (equipment) => {
                return exerciseName.toLowerCase().includes(equipment);
            });
            let exerciseMuscleGroup = Object.keys(muscle_keyword_map).filter( (keyword) => {
                return exerciseName.toLowerCase().includes(keyword);
            });
           
            if(exerciseDifficulty == undefined){
                exerciseDifficulty = "beginner";
            }
    
            if(exerciseEquipment !== 'undefined'){
                exerciseEquipment = exerciseEquipment.map( (equipment) => {
                    if(equipment in equipment_keyword_map)
                        return equipment_keyword_map[equipment];
                    else 
                        return equipment;
                });
            }else{
                exerciseEquipment = ["No equipment"];
            }
            
            if(exerciseMuscleGroup !== 'undefined'){
                exerciseMuscleGroup = exerciseMuscleGroup.map( (keyword) => {
                    return muscle_keyword_map[keyword];
                });
            }else{
                exerciseMuscleGroup = [];
            }
            
            exerciseMuscleGroup = [].concat.apply([], exerciseMuscleGroup);
            exerciseMuscleGroup = [... new Set(exerciseMuscleGroup)];
            exerciseEquipment = [... new Set(exerciseEquipment)];
            const exercise = {
                name: exerciseName,
                difficulty: exerciseDifficulty,
                muscle_group: exerciseMuscleGroup,
                equipment: exerciseEquipment,
                videoLink: exerciseVideoLink,
                thumbnail: exerciseThumbnail
            };
            exercises.push(exercise);
            console.log(`${exercise.name} has been added correctly`);
            exerciseIndex++;  
        }catch{
            console.log(`${exerciseLink} returned 404`);
            exerciseIndex++;
        }
    }
    ExerciseModel.create(exercises)
    .then( () => {
        console.log("Exercises have been loaded correctly");
        mongoose.disconnect();
    })
    .catch(console.log);
  })
  .catch(console.log);


