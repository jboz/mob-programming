// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as microsoftTeams from '@microsoft/teams-js';
import React, { useEffect, useState } from 'react';
import './App.css';

const Timer = () => {
  return <IFrame />;
};

const IFrame = () => {
  const [theme, setTheme] = useState();

  const setThemeFromContext = theme => setTheme(theme === 'default' ? 'teams-light' : 'teams-dark');

  microsoftTeams.registerOnThemeChangeHandler(setThemeFromContext);

  useEffect(() => {
    microsoftTeams.getContext(context => setThemeFromContext(context.theme));
  }, []);

  return (
    <iframe
      style={{ position: 'absolute', height: '100%', width: '100%', border: 'none' }}
      src={`https://mob-timer.ifocusit.ch?theme=${theme}`}
      title="timer"
    ></iframe>
  );
};

export default Timer;
