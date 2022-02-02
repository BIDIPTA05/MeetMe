const users = [];

// join user to chat
const userJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
}



// User leave chat
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get Room users
const getRoomUsers = (roomId) => {
    return users.filter(user => user.room === roomId);
}

// get total count of users
const getTotalUsers = () => {
    return users.length;
}

// get the current user
const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

module.exports = {
    userJoin,
    getCurrentUser,
    getTotalUsers,
    getRoomUsers,
    userLeave,
}