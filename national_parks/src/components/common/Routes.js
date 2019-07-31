import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AllTickets from '../../tickets/AllTickets';
import MyTickets from '../../tickets/MyTickets';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' compoonent ={AllTickets} />
      <Route path='/all-tickets' component={AllTickets}/>
      <Route path='/my-tickets' component={MyTickets} />
    </Switch>
  );
};

export default Routes;