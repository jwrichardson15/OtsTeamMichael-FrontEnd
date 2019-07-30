import React from 'react';
import './App.css';
import NavMenu from './components/common/NavMenu';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/common/Routes';
import './App.css'
function App() {
  return (

    <BrowserRouter>
      <div className='App'>
        <div className='body'>
          <header> National Parks</header>
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
