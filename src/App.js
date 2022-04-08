import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
