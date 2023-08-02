import React, { useState,useContext  } from 'react';
import RoomForm from './RoomForm.js';
import './App.css';
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chat from './pages/Chat';
import {
  Route,useHistory
} from "react-router-dom";
import UserContext from './ContextProvider'

function App() {
  const history = useHistory();
  const { name,roomid,setName,setRoomid} = useContext(UserContext)
  const handleJoinRoom = (userId, roomId) => {
    setName(userId)
    setRoomid(roomId)
    history.push('/chat');
  };

  const handleCreateRoom = (userId,roomId) => {
    console.log(`Creating a new room with ID: ${userId}`);
    // Add your logic for creating a new room here
    setName(userId)
    setRoomid(roomId)
    history.push('/chat');


  };
  return (
    <div>
      {
        name==""?(
        <RoomForm
        existingRoomId="room123" // Provide an existing room ID if available
        onJoinRoom={handleJoinRoom}
        onCreateRoom={handleCreateRoom}
      />
        ):("")
      }
      
      <div>
          <ChakraProvider theme={theme}>
          <Route path="/chat" component={Chat} /> 
          </ChakraProvider>
      </div>
    </div>
  );
}

export default App;
