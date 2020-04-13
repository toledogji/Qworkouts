import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import Exercise from './components/Exercise';
import Exercises from './components/Exercises';
import NewExercise from './components/NewExercise';
import Workout from './components/Workout';
import Workouts from './components/Workouts';
import NewWorkout from './components/NewWorkout';
import axiosClient from './config/axios';

function App() {

  //State
  const [exercises, saveExercises] = useState([]);
  const [query, saveQuery] = useState(true);

  useEffect( () => {
    if(query){
      const queryAPI = () => {
        axiosClient.get('/exercise')
          .then( response => {
            saveExercises(response.data);
            saveQuery(false);
          })
          .catch( error => {
            console.log(error);
          })
      }
      queryAPI();
    }
  }, [query]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workout" component={Workouts} />
        <Route exact path="/workout/new" component={NewWorkout} />
        <Route exact path="/workout/:id" component={Workout} />
        <Route exact path="/exercise" component={ () => <Exercises exercises={exercises} /> } />
        <Route exact path="/exercise/new" component={() => <NewExercise saveQuery={saveQuery}/> } />
        <Route 
          exact 
          path="/exercise/:id" 
          render={(props) => {
            const exercise= exercises.filter(exercise => exercise._id === props.match.params.id)

            return(
              <Exercise exercise={exercise[0]} saveQuery={saveQuery} />
            )
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
