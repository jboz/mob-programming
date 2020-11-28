import React from 'react';

const IFrame = () => {
  return (
    <iframe
      style={{ position: 'absolute', height: '100%', width: '100%', border: 'none' }}
      src="https://mob-timer.ifocusit.ch"
      title="timer"
    ></iframe>
  );
};

export default IFrame;
