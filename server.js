const express = require('express');
const app = express();
const Hyperswarm = require('hyperswarm')
const http = require('http');
const cors = require('cors');
const goodbye = require('graceful-goodbye')
const crypto = require('hypercore-crypto')
const b4a = require('b4a')
const Buffer = require("buffer")
const socketIo = require('socket.io');


app.use(cors);

const server = app.listen(5000,()=>console.log("Port running at 5000"))

const io = socketIo(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});


io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join', (room)=>{
      swarm.on('connection', conn => {
          const name = b4a.toString(conn.remotePublicKey, 'hex')
          console.log('* got a connection from:', name, '*')
          conns.push(conn)
          conn.once('close', () => conns.splice(conns.indexOf(conn), 1))
          conn.on('data', data => console.log(`${name}: ${data}`))
      })
      
      const topic = room ? b4a.from(room, 'hex') : crypto.randomBytes(32)
      const discovery = swarm.join(topic, { client: true, server: true })
      console.log(discovery);
      // The flushed promise will resolve when the topic has been fully announced to the DHT
      discovery.flushed().then(() => {
          console.log('joined topic:', b4a.toString(topic, 'hex'))
      })        
  })
  socket.on('message', (msg) => {

      // Broadcast stdin to all connections
      // process.stdin.on('data', d => {
        console.log(conns);
          for (const conn of conns) {
              conn.write(msg)
          }
      // })

      // Broadcast the message to all connected clients
      // io.emit('chat message', msg);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});
