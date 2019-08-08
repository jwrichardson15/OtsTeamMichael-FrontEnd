import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/common/Routes';
import Header from './components/common/Header';

const App = (props) => {

  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='body'>
          <div className='content'>
            <Routes />
          </div>
        </div>
      </div>
    </BrowserRouter>
    
    );
}


export default App;
