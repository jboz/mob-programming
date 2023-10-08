'use client';

import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { useDoc } from '../core/firebase';
import { Timer } from './timer';

interface Timer {
  value: string;
  startAt: Timestamp | null;
}

interface Room {
  name: string;
  timer: Timer;
}

const Room = ({ params }: { params: { roomName: string } }) => {
  const [room, setRoom] = useDoc<Room>('/rooms', params.roomName);

  const [reset, setReset] = useState(false);

  const startCountDown = () => setRoom({ timer: { startAt: serverTimestamp() as Timestamp } as Timer });
  const pauseCountDown = () => setRoom({ timer: { startAt: null } as Timer });
  const resetCountDown = () => {
    pauseCountDown();
    setReset(true);
  };

  return (
    <>
      <header>
        <h1>Mob programming - {room?.name}</h1>
      </header>
      <Container>
        <Timer
          roomDuration={room?.timer.value || 'PT15M'}
          onDurationChanged={timer => setRoom({ timer: { value: timer } as Timer })}
          startAt={room?.timer.startAt}
          reset={reset}
          onCountDownFinished={() => setRoom({ timer: { startAt: null } as Timer })}
        />
        {(!room?.timer.startAt && <button onClick={startCountDown}>Start</button>) || <button onClick={pauseCountDown}>Pause</button>}
        <button onClick={resetCountDown}>Reset</button>
      </Container>
    </>
  );
};

const Container = styled.div({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '1em',
  alignItems: 'center'
});

export default Room;
