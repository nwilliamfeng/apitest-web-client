import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Shell } from './components'
require('./assets/styles/react-contextmenu.css'); //这里react-contextmenu.css需要在全局里声明

class App extends Component {

  constructor(props){
    super(props);
    this.state={isLoading:true};

  }

  componentDidMount(){
    window.setTimeout(()=>{
       this.setState({isLoading:false});
    }, 100);
    
  }
  
  render() {
    const {isLoading}=this.state;
    return (
      <div className="App">
        {/* {isLoading===true &&<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>欢迎使用Redis Web Manager</h2>
          <a href='https://github.com/yswenli/SAEA'>Powered By SAEA</a>
        </div>} */}
        {isLoading===false && <Shell />}
      </div>

    );
  }
}

export default App;
