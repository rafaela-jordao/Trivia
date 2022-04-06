import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
