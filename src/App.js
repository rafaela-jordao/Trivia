import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/settings" component={ Settings } /> */}
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
