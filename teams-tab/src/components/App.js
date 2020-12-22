import * as microsoftTeams from '@microsoft/teams-js';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Privacy from './Privacy';
import TermsOfUse from './TermsOfUse';
import Timer from './Timer';

function App() {
  // Initialize the Microsoft Teams SDK
  microsoftTeams.initialize();

  return (
    <Router>
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/termsofuse" component={TermsOfUse} />
      <Route exact path="/timer" component={Timer} />
    </Router>
  );
}

export default App;
