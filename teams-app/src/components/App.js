import * as microsoftTeams from '@microsoft/teams-js';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MobStore from '../MobStore';
import Hello from './Hello';
import IFrame from './IFrame';
import Privacy from './Privacy';
import TabConfig from './TabConfig';
import TermsOfUse from './TermsOfUse';
import Timer from './Timer';

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
const App = () => {
  const mobStore = new MobStore();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
    Notification.requestPermission();
  }

  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {
    if (window.parent !== window.self) {
      // Initialize the Microsoft Teams SDK
      console.log(`initialize microsoft teams`);
      microsoftTeams.initialize();
    }

    // Display the app home page hosted in Teams
    return (
      <Router>
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/termsofuse" component={TermsOfUse} />
        <Route exact path="/timer" children={<Timer store={mobStore} />} />
        <Route exact path="/test" component={Hello} />
        <Route exact path="/hello" component={IFrame} />
        <Route exact path="/config" component={TabConfig} />
      </Router>
    );
  }

  // Error when the Microsoft Teams SDK is not found
  // in the project.
  return <h3>Microsoft Teams SDK not found.</h3>;
};

export default App;
