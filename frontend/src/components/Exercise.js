import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';  
import DeleteIcon from '@material-ui/icons/Delete';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingRight: '64px',
        paddingLeft: '64px'
    },
    test:{
        width:'auto',
        height: 'auto'
    }

}));

const Exercise = (props) =>{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };    

    if(!props.exercise){
        props.history.push("/exercise");
        return null;
    }

    const deleteExercise = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Deleted!',
                    'Your exercise has been deleted.',
                    'success'
                    )
                    
                    axiosClient.delete(`exercise/${id}`)
                        .then(response => {
                            props.saveQuery(true);
                            props.history.push("/exercise");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
    }

    return (
        <Fragment>
            <h1 className="my-5">Exercise: {props.exercise.name} </h1>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/exercise'} className="btn btn-warning text-uppercase py-2 px-5 font-weight-bold">
                            Go back
                        </Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="pl-5 pr-5 pt-5 list-group-item list-group-item-action-flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="mb-3">{props.exercise.name}</h3>
                                    <small className="difficulty">
                                        {props.exercise.difficulty}
                                    </small>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <img className="img-fluid img-exercise" style={{cursor: "pointer"}} src={props.exercise.thumbnail} alt={props.exercise.name}  onClick={handleOpen}></img>
                                    </div>
                                    <div className="col">
                                        <h4>Muscle group:</h4>
                                        {props.exercise.muscle_group.map(element => (
                                            <span key={props.exercise.name + element} className="badge badge-warning mr-2 mb-4">{element.toUpperCase()}</span>
                                        ))}
                                        <h4>Equipment:</h4>
                                        {props.exercise.equipment.map(element => (
                                            <span key={props.exercise.name + element} className="badge badge-warning mr-2">{element.toUpperCase()}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex pt-3">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteExercise(props.exercise._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                       <div>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <ReactPlayer url={props.exercise.videoLink} playing />
                                </Fade>
                            </Modal>
                        </div>
                </div>
            </div>

        </Fragment>
    );
}

export default withRouter(Exercise);