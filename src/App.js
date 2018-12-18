import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Shell } from './components'
import { Router, Route, BrowserRouter } from 'react-router-dom';

require('./assets/styles/react-contextmenu.css'); //这里react-contextmenu.css需要在全局里声明

class App extends Component {

  constructor(props){
    super(props);
    
  }

   
  
  render() {
   
    return <BrowserRouter basename="/guba-test"> 
      <div className="App">
        
        <Route exact path='/' component={Shell}/> 
      </div>
    </BrowserRouter>
    
  }
}

export default App;
