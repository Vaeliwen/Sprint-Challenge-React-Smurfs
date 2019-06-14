import React from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get(`http://localhost:5000/smurfs`)
        .then(response => {
          this.setState({smurfs: response.data})
        })
        .catch(err => {
          console.error('Server error', err)
        })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/smurf-form'>Add To List!</NavLink>
        </nav>
        <Route exact path='/' render={props => (
          <Smurfs {...props} smurfs={this.state.smurfs} />
        )} />
        <Route path='/smurf-form' component={SmurfForm} />
      </div>
    );
  }
}

export default App;
