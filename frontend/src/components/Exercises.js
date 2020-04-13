import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Exercises = ({exercises}) =>{
    
    if(exercises.length === 0){
        return(
            <Fragment>
                <h1 className="my-5">Exercise Library</h1>
                        
                <div className="container mt-2 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            <Link to={'/exercise/new'} className="btn btn-warning text-uppercase py-2 px-5 font-weight-bold">
                                Create Exercise
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    };
    

    return (
        <Fragment>
            <h1 className="my-5">Exercise Library</h1>
                    
            <div className="container mt-2 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/exercise/new'} className="btn btn-warning text-uppercase py-2 px-5 font-weight-bold">
                            Create Exercise
                        </Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {exercises.map(exercise => (
                                <Link to={`exercise/${exercise._id}`} key={exercise._id} className="p-5 mt-2 list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between mb-4">
                                        <h3 className="mb-3">{exercise.name}</h3>
                                        <small className="difficulty">
                                            {exercise.difficulty}
                                        </small>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img className="img-fluid img-exercise" src={exercise.thumbnail} alt={exercise.name}></img>
                                        </div>
                                        <div className="col">
                                            <h4>Muscle group:</h4>
                                            {exercise.muscle_group.map(element => (
                                                <span key={exercise.name + element} className="badge badge-warning mr-2 mb-4">{element.toUpperCase()}</span>
                                            ))}
                                            <h4>Equipment:</h4>
                                            {exercise.equipment.map(element => (
                                                <span key={exercise.name + element} className="badge badge-warning mr-2">{element.toUpperCase()}</span>
                                            ))}
                                        </div>
                                        
                                    </div>
                                </Link>
                            ))} 
                        </div>
                    </div>

                </div>
            </div>  

        </Fragment>
    );
}

export default withRouter(Exercises);