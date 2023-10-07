import { Duration, normalize, parse } from 'duration-fns';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimerProps {
  duration: string;
  onDurationChanged: (duration: string) => void;
}

export const Timer = ({ duration, onDurationChanged }: TimerProps) => {
  const [counter, setCounter] = useState<Duration>({ minutes: 0, seconds: 0 } as Duration);

  useEffect(() => {
    setCounter(parse(duration));
  }, [duration]);

  const incMinutes = () => updateTimer({ minutes: counter.minutes + 1 });
  const decMinutes = () => updateTimer({ minutes: counter.minutes - 1 });
  const incSeconds = () => updateTimer({ seconds: counter.seconds + 10 });
  const decSeconds = () => updateTimer({ seconds: counter.seconds - 10 });

  const updateTimer = (modif: Partial<Duration>) => {
    const newDuration = normalize({ ...counter, ...modif });
    if (newDuration.seconds >= 0 && newDuration.minutes >= 0) {
      setCounter(newDuration);
      onDurationChanged(`PT${newDuration.minutes}M${newDuration.seconds}S`);
    }
  };

  return (
    <div>
      <h2></h2>

      <Container>
        <div>
          <div>
            <Button onClick={incMinutes}>+ 1</Button>
            <Val>{counter.minutes}</Val>
            <Button onClick={decMinutes}>- 1</Button>
          </div>
          <div>:</div>
          <div>
            <Button onClick={incSeconds}>+ 10</Button>
            <Val>{counter.seconds}</Val>
            <Button onClick={decSeconds}>- 10</Button>
          </div>
        </div>
        {/* <div>
          <button onClick="start()" *ngIf="!started" [disabled]="started" color="accent">
            <mat-icon>play_arrow</mat-icon>
            START
          </button>
          <button onClick={pause} *ngIf="started" [disabled]="!started" color="warn">
            <mat-icon>pause</mat-icon>
            PAUSE
          </button>
          <button onClick={reset}>
            <mat-icon>replay</mat-icon>
            RESET
          </button>
        </div> */}
      </Container>
    </div>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignSelf: 'center',
  height: '100%',
  '& > div': {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%'
  },
  '& > div > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%'
  }
});

const Button = styled.div({
  cursor: 'pointer',
  textAlign: 'center'
});

const Val = styled.div({
  fontSize: 'xxx-large'
});
