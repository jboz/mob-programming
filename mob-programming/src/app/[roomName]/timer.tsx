import { Duration, apply, between, isNegative, normalize, parse, sum } from 'duration-fns';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDoc } from '../core/firebase';

interface TimerProps {
  roomDuration: string;
  onDurationChanged: (duration: string) => void;
  startAt: Timestamp | null | undefined;
  onCountDownFinished: () => void;
  reset: boolean;
}

export const Timer = ({ roomDuration, onDurationChanged, startAt, onCountDownFinished, reset }: TimerProps) => {
  const [counter, setCounter] = useState<Duration>({ minutes: 0, seconds: 0 } as Duration);
  const [serverTimeOffset] = useDoc<number>('.info', 'serverTimeOffset');
  const [countDownInterval, setCountDownInterval] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const parsed = parse(roomDuration);
    setCounter(parsed);
    clearInterval(countDownInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDuration, reset]);

  useEffect(() => {
    if (startAt) {
      const interval = setInterval(() => {
        const endAt = apply(startAt.toDate(), normalize(sum(counter, { milliseconds: serverTimeOffset || 0 })));
        const timeLeft = between(Date.now(), endAt);
        if (isNegative(timeLeft)) {
          clearInterval(interval);
          setCounter(parse(roomDuration));
          setTimeout(onCountDownFinished, 1000);
        } else {
          setCounter(timeLeft);
        }
      }, 100);
      setCountDownInterval(interval);
    } else {
      clearInterval(countDownInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAt]);

  const incMinutes = () => updateTimer({ minutes: counter.minutes + 1 });
  const decMinutes = () => updateTimer({ minutes: counter.minutes - 1 });
  const incSeconds = () => updateTimer({ seconds: counter.seconds + 10 });
  const decSeconds = () => updateTimer({ seconds: counter.seconds - 10 });

  const updateTimer = (modif: Partial<Duration>) => {
    let newDuration = normalize({ ...counter, ...modif });
    newDuration = {
      ...newDuration,
      seconds: Math.max(newDuration.seconds, 0)
    };
    if (newDuration.minutes >= 0) {
      setCounter(newDuration);
      onDurationChanged(`PT${newDuration.minutes}M${newDuration.seconds}S`);
    }
  };

  const pad = (value: number) => `${value}`.padStart(2, '0');

  return (
    <div>
      <h2></h2>
      <Container>
        <div>
          <div>
            <Button onClick={incMinutes}>+ 1</Button>
            <Val>{pad(counter.minutes)}</Val>
            <Button onClick={decMinutes}>- 1</Button>
          </div>
          <div>:</div>
          <div>
            <Button onClick={incSeconds}>+ 10</Button>
            <Val>{pad(counter.seconds)}</Val>
            <Button onClick={decSeconds}>- 10</Button>
          </div>
        </div>
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
  fontSize: '20vw'
});
