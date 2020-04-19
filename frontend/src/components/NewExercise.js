import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import axiosClient from '../config/axios';

const muscle_groups = [
    'whole body',
    'abs',
    'biceps',
    'triceps',
    'legs',
    'back',
    'chest',
    'shoulders',
  ];

const equipments = [
    'pull up bar',
    'low bar',
    'dip bar',
    'dumbbell',
    'barbell',
    'pole',
    'resistance band',
    'bench',
    'weight vest',
    'box',
    'paralletes',
]

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
 
}));

const NewExercise = (props) =>{
      
    const classes = useStyles();
    const [exercise, saveExercise] = useState({
        name: '',
        difficulty: '',
        muscle_group: [],
        equipment: [],
        videoLink: '',
        thumbnail: '',
    });

    const updateState = e => {
        saveExercise({
            ...exercise,
            [e.target.name] : e.target.value
        });
    }
    
    const createNewExercise = e =>{
        e.preventDefault(); 
        axiosClient.post('/exercise', exercise)
            .then(response => {
                props.saveQuery(true);
                props.history.push('/exercise');
            })
    }
    
    return (
        <Fragment>
            <h1 className="my-5">Create new exercise</h1>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/exercise'} className="btn btn-warning text-uppercase py-2 px-5 font-weight-bold">
                            Go back
                        </Link>
                    </div>
                    
                    <div className="col-md-8 mx-auto">
                        <form className={classes.root + " bg-white p-5 borderded"} onSubmit={createNewExercise} noValidate autoComplete="off" >
                            <h3 className="mb-3">New Exercise</h3>
                            <TextField 
                                fullWidth 
                                id="name" 
                                name="name" 
                                onChange={updateState} 
                                label="Exercise Name" 
                                variant="outlined" 
                            />
                            <FormControl required fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                                <Select
                                required="true"
                                labelId="difficulty-label"
                                id="difficulty"
                                name="difficulty"
                                value={exercise.difficulty}
                                onChange={updateState}
                                label="Difficulty"
                                >

                                    <MenuItem value={"beginner"}>Beginner</MenuItem>
                                    <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                                    <MenuItem value={"advanced"}>Advanced</MenuItem>
                                
                                </Select>
                            </FormControl>
                            <FormControl wrap={"nowrap"} fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="muscleGroup-label">Muscle group</InputLabel>
                                <Select
                                labelId="muscleGroup-label"
                                id="muscle_group"
                                multiple
                                value={exercise.muscle_group}
                                name="muscle_group"
                                onChange={updateState}
                                label="Muscle group"
                                renderValue={(selected) => selected.join(', ')}
                                >

                                    {muscle_groups.map((muscle_group) => (
                                        <MenuItem key={muscle_group} value={muscle_group}>
                                            <Checkbox style={{color: "#FFB101"}} checked={exercise.muscle_group.indexOf(muscle_group) > -1} />
                                            <ListItemText primary={muscle_group} />
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="equipment-label">Equpiment</InputLabel>
                                <Select
                                labelId="equipment-label"
                                id="equipment"
                                multiple
                                value={exercise.equipment}
                                name="equipment"
                                onChange={updateState}
                                label="Equipment"
                                renderValue={(selected) => selected.join(', ')}
                                >
                                    {equipments.map((element) => (
                                        <MenuItem key={element} value={element}>
                                            <Checkbox style={{color: "#FFB101"}} checked={exercise.equipment.indexOf(element) > -1} />
                                            <ListItemText primary={element} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField 
                                fullWidth 
                                id="videoLink" 
                                name="videoLink" 
                                onChange={updateState} 
                                label="Video link" 
                                variant="outlined" 
                            />
                            <TextField 
                                fullWidth 
                                id="thumbnail" 
                                name="thumbnail" 
                                onChange={updateState} 
                                label="Thumbnail link" 
                                variant="outlined" 
                            />
                            <input type="submit" className="btn btn-warning mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Create exercise"  />
                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default withRouter(NewExercise);