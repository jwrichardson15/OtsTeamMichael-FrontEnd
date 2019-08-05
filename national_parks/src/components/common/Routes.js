import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateTicket from '../../tickets/CreateTicket';
import TicketsTable from '../../tickets/TicketsTable';
import { authenticationService } from '../../services/AuthenticationService';

const Routes = () => {
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
        <Route exact path='/' component={TicketsTable}/>
        <Route exact path='/all-tickets' render={() => <TicketsTable type="park" />} />
        <Route path='/my-tickets' render={() => <TicketsTable type="employee" />}/>
        <Route exact path='/create-ticket' component={CreateTicket} /> 
        </Switch> 
      }
      </>
    
  );
};


export default Routes;
