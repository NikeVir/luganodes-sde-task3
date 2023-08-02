import React, { useState } from 'react';
import './App.css'
function RoomForm({ existingRoomId, onJoinRoom, onCreateRoom }) {
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState(existingRoomId || '');
  const [isNewRoom, setIsNewRoom] = useState(!existingRoomId);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleOptionChange = () => {
    setIsNewRoom(!isNewRoom);
    setRoomId(''); // Clear the room ID input
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewRoom) {
      onCreateRoom(userId,roomId);
    } else {
      onJoinRoom(userId, roomId);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label className="label" htmlFor="userId">Enter your ID:</label>
        <input
        className="input" 
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
        />
      </div>
      <div>
        <label className="label" htmlFor="roomId">
          {isNewRoom ? 'Enter Room ID:' : 'Room ID:'}
        </label>
        <input
        className="input"
          type="text"
          id="roomId"
          value={roomId}
          onChange={handleRoomIdChange}
          
        />
      </div>
      <div>
        <label className="label" htmlFor="isNewRoom">Create New Room:</label>
        <input
        className="input"
          type="checkbox"
          id="isNewRoom"
          checked={isNewRoom}
          onChange={handleOptionChange}
        />
      </div>
      <button className="button" type="submit">{isNewRoom ? 'Create Room' : 'Join Room'}</button>
    </form>
  );
}

export default RoomForm;
