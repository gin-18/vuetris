const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("createRoom", () => {
    const room = generateRoomId();
    socket.join(room);

    // init player info
    rooms[room] = {
      [socket.id]: {
        room,
        ready: false,
        again: false,
        gameOver: false,
        score: 0,
      },
    };

    socket.emit("roomCreated", rooms[room]);
  });

  socket.on("joinRoom", ({ action, room }) => {
    const clients = io.sockets.adapter.rooms.get(room);

    // message on player joined the room
    if (action) {
      socket.to(room).emit("playerJoined", rooms[room]);
      return;
    }

    // check if room is not exists
    if (!clients) {
      socket.emit("roomNotFound");
      return;
    }

    // check if room is full
    if (clients.size >= 2) {
      socket.emit("roomFull");
      return;
    }

    // join room and init player info
    socket.join(room);
    rooms[room][socket.id] = {
      room,
      ready: false,
      again: false,
      gameOver: false,
      score: 0,
    };
    socket.emit("roomJoined", rooms[room]);
  });

  socket.on("ready", ({ room, ready }) => {
    emitByAttr(
      socket.id,
      room,
      "ready",
      ready,
      "zeroReady",
      "oneReady",
      "twoReady",
    );
  });

  socket.on("updateScore", ({ room, score }) => {
    rooms[room][socket.id].score = score;
    io.to(room).emit("scoreUpdated", rooms[room]);
  });

  socket.on("gameOver", ({ room, gameOver }) => {
    emitByAttr(
      socket.id,
      room,
      "gameOver",
      gameOver,
      "zeroGameOver",
      "oneGameOver",
      "twoGameOver",
    );
  });

  socket.on("again", ({ room, again }) => {
    emitByAttr(
      socket.id,
      room,
      "again",
      again,
      "zeroAgain",
      "oneAgain",
      "twoAgain",
    );
  });

  socket.on("replay", ({ room }) => {
    rooms[room][socket.id].ready = false;
    rooms[room][socket.id].again = false;
    rooms[room][socket.id].gameOver = false;
    rooms[room][socket.id].score = 0;

    io.to(room).emit("replay");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    // remove player while disconnect
    for (const room in rooms) {
      delete rooms[room][socket.id];
    }
  });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function generateRoomId() {
  return uuidv4().substring(0, 8);
}

function emitByAttr(id, room, attr, attrValue, zeroEvent, oneEvent, twoEvent) {
  rooms[room][id][attr] = attrValue;

  const length = Object.keys(rooms[room]).length;

  if (length > 1) {
    if (checkAttr(true)) {
      io.to(room).emit(twoEvent, rooms[room]);
      return;
    }

    if (checkAttr(false)) {
      io.to(room).emit(zeroEvent, rooms[room]);
      return;
    }
  }

  for (let i = 0; i < length; i++) {
    const key = Object.keys(rooms[room])[i];

    if (rooms[room][key][attr]) {
      io.to(room).emit(oneEvent, rooms[room]);
      return;
    }
  }

  function checkAttr(value) {
    return Object.keys(rooms[room]).every(
      (key) => rooms[room][key][attr] === value,
    );
  }
}
