import React, {useState, useEffect} from 'react';
import './App.css';
import NavMenu from './components/common/NavMenu';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/common/Routes';
import Header from './components/common/Header';
import { authenticationService } from './services/AuthenticationService';

const App = (props) => {
  const [userLoggedOut, setUserLoggedOut] = useState(true);

  useEffect(() => {
    authenticationService.currentToken.subscribe(value => setUserLoggedOut(!value));
  });

  

  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='body'>
          {
            !userLoggedOut &&  <div className='sidebar'> <NavMenu /> </div>
          }
          <div className='content'>
            <Routes />
          </div>
        </div>
      </div>
    </BrowserRouter>
    
    );
}


export default App;
