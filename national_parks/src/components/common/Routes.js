import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateTicket from '../../tickets/CreateTicket';
import AllTickets from '../../tickets/AllTickets';
import MyTickets from '../../tickets/MyTickets';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={AllTickets} />
      <Route path='/createTicket' component={CreateTicket} />
      <Route path='/allTickets' component={AllTickets}/>
      <Route path='/myTickets' component={MyTickets} />
    </Switch>
  );
};

export default Routes;
