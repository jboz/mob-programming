import { Button, Flex, PauseThickIcon, PlayIcon, UndoIcon } from '@fluentui/react-northstar';
import { observer } from 'mobx-react';
import React from 'react';

const classes = {
  counter: {
    fontSize: '3vw',
    lineHeight: 'initial'
  },
  counterTime: {
    fontSize: '20vw'
  },
  '@media (max-width: 599px)': {
    counterTime: {
      fontSize: '30vw'
    }
  }
};

const Timer = observer(({ store }) => {
  window.Notification.requestPermission();

  const incrementMinutes = () => store.changeDuration(1, 'minutes');
  const decrementMinutes = () => store.changeDuration(-1, 'minutes');
  const incrementSeconds = () => store.changeDuration(10, 'seconds');
  const decrementSeconds = () => store.changeDuration(-10, 'seconds');
  const start = () => store.start();
  const pause = () => store.pause();
  const reset = () => store.reset();

  const pad2 = digit => (digit < 10 ? `0${digit}` : digit);

  return (
    <Flex column gap="gap.medium" style={classes.counter}>
      <Flex gap="gap.small" hAlign="center" vAlign="center">
        <Flex column hAlign="center" vAlign="center">
          <Button onClick={() => incrementMinutes()} content="+ 1" />
          <div style={classes.counterTime}>{pad2(store.instant.minutes)}</div>
          <Button onClick={() => decrementMinutes()} disabled={store.instant.minutes === 0} content="- 1" />
        </Flex>
        <div>:</div>
        <Flex column hAlign="center" vAlign="center">
          <Button onClick={() => incrementSeconds()} content="+ 10" />
          <div style={classes.counterTime}>{pad2(store.instant.seconds)}</div>
          <Button onClick={() => decrementSeconds()} disabled={store.instant.seconds === 0} content="- 10" />
        </Flex>
      </Flex>
      <Flex gap="gap.small" hAlign="center" vAlign="center">
        <Button onClick={() => start()} disabled={store.started} text icon={<PlayIcon />} content="START" />
        <Button onClick={() => pause()} disabled={!store.started} text icon={<PauseThickIcon />} content="PAUSE" />
        <Button onClick={() => reset()} text icon={<UndoIcon />} content="RESET" />
      </Flex>
    </Flex>
  );
});

export default Timer;
