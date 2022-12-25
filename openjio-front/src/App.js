import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import './App.css';
import Header from './components/Layout/Header';
import Dashboard from './components/Layout/Dashboard';
import Login from './components/Auth/Login';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'


function App() {

  const [isCreateActivity, setIsCreateActivity] = useState(false);

  const showActivityCreateModalHandler = (bool) => {
    setIsCreateActivity(bool)
  }
  
  return (
    <Fragment>
      <Router>
          <Fragment>
            <Header onCreateActivity={showActivityCreateModalHandler}/>
            <Dashboard onCreateActivity={isCreateActivity} hideCreateActivity={showActivityCreateModalHandler} />
          </Fragment>
      </Router>

    </Fragment>
  );
}

export default App;
