const express = require('express');
const app = express();
const cors = require('cors');
const { userJoin, getCurrentUser, getTotalUsers, getRoomUsers, userLeave } = require('./utils/userInfo')
const server = require('http').Server(app);
const favicon = require('serve-favicon')
const path = require('path');
const formatMessage = require('./utils/message')
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');


const peerServer = ExpressPeerServer(server, {
    debug: true,
    port: 5000
});
// PORT 
const PORT = process.env.PORT || 5000

// view engine setting
app.set('view engine', 'ejs');

// set the middleware
app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/peerjs', peerServer);
app.use(express.static('./public'))

// route
app.get('/:room&:user', (req, res) => {
    const roomId = req.params.room;
    const roomLimit = roomId.slice(-1);  // this will give the last value
    if (roomLimit)
        res.render('room', { roomId: roomId, username: req.params.user, roomLimit: roomLimit });
})


// connection establishment
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId, roomLimit, Username) => {
        // to verify the code
        if (roomLimit > 6 || roomLimit < 2) {
            socket.emit('redirect');
            return;
        }
        const user = userJoin(socket.id, Username, roomId);
        socket.join(user.room);

        // remove the extra members
        if (getTotalUsers() > roomLimit) {
            userLeave(socket.id);
            socket.emit('redirect');
            return;
        }
        // broadcast the info
        socket.broadcast.to(user.room).emit('user-join', `${Username} has joined the room`)
        socket.to(user.room).emit('user-connected', userId);
        socket.on('message', message => {
            const currentUser = getCurrentUser(socket.id);
            io.to(user.room).emit('createMessage', formatMessage(currentUser.username, message));
        })

        // Send Username In participants section
        io.to(user.room).emit('participants', {
            users: getRoomUsers(user.room)
        })

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                setTimeout(() => {
                    io.to(user.room).emit('disconnectMsg', `${Username} has left the room`)
                }, 1000);

                // Send Username In participants section
                io.to(user.room).emit('participants', {
                    users: getRoomUsers(user.room)
                })
            }
        })
    })
})


server.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})

