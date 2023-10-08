'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const [roomName, setRoomName] = useState<string>();
  const router = useRouter();

  const connectRoom = () => {
    if (roomName) {
      router.push(roomName);
    }
  };

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  return (
    <>
      <header>
        <h1>Mob programming</h1>
      </header>
      <Container>
        <input value={roomName} onChange={handleRoomNameChange} type="text" placeholder="Enter the room name..." />
        <button onClick={connectRoom}>Enter room</button>
      </Container>
    </>
  );
}

const Container = styled.div({
  flex: '1 1 auto',
  display: 'flex',
  gap: '20px',
  padding: '1em'
});
