import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateTicket from '../../tickets/CreateTicket';
import AllTickets from '../../tickets/AllTickets';
import MyTickets from '../../tickets/MyTickets';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={AllTickets} />
      <Route path='/create-ticket' component={CreateTicket} />
      <Route path='/all-tickets' component={AllTickets}/>
      <Route path='/my-tickets' component={MyTickets} />
    </Switch>
  );
};

export default Routes;
