'use client';

import { useState } from 'react';
import { Timer } from './components/Timer';
import { useCollection, useDoc } from './db';

interface Room {
  name: string;
  timer: string;
}

export default function Home() {
  const [roomName, setRoomName] = useState<string>();
  const [connected, setConnected] = useState(false);

  const disconnect = () => {
    setRoomName(undefined);
    setConnected(false);
  };

  const connectRoom = (roomName: string) => {
    if (roomName) {
      setRoomName(roomName);
      setConnected(true);
    }
  };

  return (
    <div>
      <h1>Mob programming</h1>
      {!connected && (
        <>
          <Rooms onRoomSelection={roomName => connectRoom(roomName)} />
        </>
      )}
      {connected && roomName && (
        <>
          <Room name={roomName} />
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
}

interface RoomsProps {
  onRoomSelection: (roomName: string) => void;
}

const Rooms = ({ onRoomSelection }: RoomsProps) => {
  const [roomName, setRoomName] = useState<string>('');
  const [rooms, addRoom] = useCollection<Room>('/rooms');

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const createRoom = () => {
    if (roomName) {
      addRoom(roomName, { name: roomName } as Room);
    }
  };

  return (
    <>
      <ul>
        {rooms &&
          rooms.map((r, index) => (
            <li key={index} onClick={() => onRoomSelection(r.name)} style={{ cursor: 'pointer' }}>
              {r.name} - {r.timer}
            </li>
          ))}
        <li>
          <div>
            <input value={roomName} onChange={handleRoomNameChange} type="text" placeholder="Enter the room name..." />
            <button onClick={createRoom}>Create Room</button>
          </div>
        </li>
      </ul>
    </>
  );
};

interface RoomProps {
  name: string;
}

const Room = ({ name }: RoomProps) => {
  const [room, setRoom] = useDoc<Room>('/rooms', name);

  return (
    <div>
      <h2>
        {room?.name} - {room?.timer}
      </h2>

      <Timer duration={room?.timer || 'PT15M'} onDurationChanged={timer => setRoom({ timer })} />
    </div>
  );
};
