import React,{useEffect} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {isLoggedInUser} from './actions';

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect( () => {
    if(!auth.authenticated){
       dispatch(isLoggedInUser());
    }
 },[]);


  return (
    <div className="App">
      {/* Only Logged in user Can see Home Route */}
      <Router>
         <PrivateRoute path="/" component={HomePage} exact />
         <Route path="/login" component={LoginPage} />
         <Route path="/signup" component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
