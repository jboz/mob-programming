import * as microsoftTeams from '@microsoft/teams-js';
import React, { useEffect, useState } from 'react';

const Hello = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    microsoftTeams.getContext(context => setUserName(context.loginHint));
  }, []);

  return (
    <div>
      <h3>Hello World!</h3>
      <h1>Congratulations {userName}!</h1> <h3>This is the tab you made :-)</h3>
    </div>
  );
};

export default Hello;
