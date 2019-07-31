import React from 'react';
import './App.css';
import NavMenu from './components/common/NavMenu';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/common/Routes';
import './App.css'
import Header from './components/common/Header';
function App() {
  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='body'>
          <div className='sidebar'>
            <NavMenu />
          </div>
          <div className='content'>
            <Routes />
          </div>
        </div>
      </div>
    </BrowserRouter>
    
    );
}

export default App;
