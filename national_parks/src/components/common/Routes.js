import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateTicket from '../../tickets/CreateTicket';
import AllTickets from '../../tickets/AllTickets';
import MyTickets from '../../tickets/MyTickets';
import { authenticationService } from '../../services/AuthenticationService';
import PropTypes from 'prop-types';

const Routes = props => {
  const [userLoggedOut, setUserLoggedOut] = useState(true);

  useEffect(() => {
    authenticationService.currentToken.subscribe(value => setUserLoggedOut(!value));
  });

  return (
      <>
      {userLoggedOut ?
        <Switch>
          <Route exact path='/' component={CreateTicket} /> 
        </Switch>
      :
      <Switch>
        <Route exact path='/' component={AllTickets}/>
        <Route exact path='/all-tickets' component={AllTickets}/>
        <Route path='/my-tickets' component={MyTickets} />
        <Route exact path='/create-ticket' component={CreateTicket} /> 
        </Switch> 
      }
      </>
    
  );
};


export default Routes;
