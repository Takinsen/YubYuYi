const setupSocket = (io) => {
  try {
    io.on("connection", (socket) => {

      // User connects, join user room
      socket.on("userConnect", (user_id) => {
        socket.join(`user_${user_id.toString()}`);
        console.log(`User connected: ${user_id.toString()}`);
      });

      // When socket disconnects, leave all rooms
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });

    });
  } catch (error) {
    console.error(error);
  }
};

export default setupSocket;
