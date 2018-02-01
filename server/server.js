const io = require('socket.io')();
const sockets = {}
const socketIds = []

let listPlayer = []
let current = 0

const position={}

  io.on('connection', (socket) => {

    console.log('New user...', socketIds.length, socketIds)

    socket.on('multi', (message) => {
      console.log('multi')
      if(listPlayer.length > 0){
        const existPlayer = listPlayer.find(function(element) {return element.id === socket.id})

        if(!existPlayer){
          const player = {id:1, idS:socket.id, name:'player_2', win:0}
          listPlayer.push(player)

          listPlayer.map((playerCurrent, i) => {
            io.sockets.connected[playerCurrent.idS].emit('gameStart', {listPlayer, i})
          })
        }

      }else{
        const player = {id:0, idS:socket.id, name:'player_1', win:0}
        listPlayer.push(player)
      }

    //  socket.broadcast.emit('coucou')
    // socketIds.push(socket.id)
    // if(socketIds.length>=2){
    //   const get2Users = [socketIds.shift(), socketIds.shift()]
    //
    //   // get2Users.map((val) => {
    //   //   console.log(val)
    //   // })
    // }
    });

    socket.on('disconnect', (message) => {
      console.log('client is disconnected... ', socket.id);
      listPlayer = []
      listPlayer.map((playerCurrent, i) => {
        listPlayer.push(player)
        io.sockets.connected[playerCurrent.idS].emit('playerLeave', {listPlayer, i})
      })
    });

    socket.on('playerPlay', (position) => {
      console.log('playerPlay')
      current = current ? 0 : 1
      if(listPlayer[current])
        io.sockets.connected[listPlayer[current].idS].emit('updateBoard', {position})

    })
    socket.on('playerQuitMulti', () => {
      console.log('playerQuitMulti')
      listPlayer = listPlayer.filter(({ idS }) => idS !== socket.id)

    })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
