// realtime communication socket.io
const socket = io();

// peer communication
const peer = new Peer()

// video creation and display
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
// client action
const chatControl = document.querySelector('.chat-control');
const participantControl = document.querySelector('.participant-control')
const main__left = document.querySelector('.main__left');
const main = document.querySelector('.main');
const main__right = document.querySelector('.main__right');
const main__right__participants = document.querySelector('.main__right__participants');
const closeIcon = document.querySelector('.close-icon');
const closeParticipant = document.querySelector('.close-participant');
const participantsList = document.querySelector('.participants__list');
const leaveMeet = document.querySelector('.leave__meeting--btn');
const roomLimitControl = document.querySelector('.room__limit__control');
// leave meeting functionality
leaveMeet.addEventListener('click', () => {
    window.location.assign(`http://localhost:3000/createorjoin`);
})

// Room limit PopUp Modal
roomLimitControl.addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = "popUpModal";
    div.innerHTML = `<h3> Room Limit : Only ${ROOM_LIMIT} Members Are Allowed </h3> <p align="center">Room limit was set by creator of this room</p>`
    setTimeout(() => {
        div.style.transform = 'translateY(40px)';
    }, 250)
    main.appendChild(div);
    setTimeout(() => {
        div.style.transform = 'translateY(-100px)';
    }, 3000)
    setTimeout(() => {
        main.removeChild(main.children[3]);
    }, 4000)

})

// chat hide/show functionality
chatControl.addEventListener('click', () => {
    chatControl.classList.toggle("hide");
    if (chatControl.classList.contains("hide")) {
        main__left.style.width = '100%';
        main__right.classList.remove('main__right__resize_window');
    } else {
        main__right.classList.add('main__right__resize_window');
        main__left.style.width = '80%';
    }
})

// participants hide/show functionality
participantControl.addEventListener('click', () => {
    participantControl.classList.toggle("hide");
    if (participantControl.classList.contains("hide")) {
        main__left.style.width = '100%';
        main__right__participants.classList.remove('main__right__resize_window');
    } else {
        main__right__participants.classList.add('main__right__resize_window');
        main__left.style.width = '80%';
    }
})

// close chat window
closeIcon.addEventListener('click', () => {
    main__left.style.width = '100%';
    chatControl.classList.toggle("hide");
    main__right.classList.remove('main__right__resize_window');
})

// close participant window
closeParticipant.addEventListener('click', () => {
    main__left.style.width = '100%';
    participantControl.classList.toggle("hide");
    main__right__participants.classList.remove('main__right__resize_window');
})


// The mediaDevices.getUserMedia() method prompts the user for permission to use a media input which produces a MediaStream
let myVideoStream
let getMyMediaId;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    // Answer the call connection
    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        })
    })

    // connecting users
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })

}).catch(err => console.log(err));

// WebRtc communication connection
peer.on('open', id => {
    console.log("connect to peer server");
    // Emitting the function
    socket.emit('join-room', ROOM_ID, id, parseInt(ROOM_LIMIT), Username);

})

//Get Users List
socket.on('participants', ({ users }) => {
    outputUsers(users);
})

// dynamically adding the participants
const outputUsers = (users) => {
    participantsList.innerHTML = `
    ${users.map(user => `
    <div class="participants__container">
    <span>
    <i class="fas avatar fa-user-astronaut"></i>
    </span>
    <h3 class="username">${user.username}</h3></div>`).join('')}`;
}

// When user join the room
socket.on('user-join', msg => {
    toasterFunc(msg);
})



const connectToNewUser = (userId, stream) => {
    // call the connection
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
}

// toaster
const toasterFunc = (msg) => {
    const div = document.createElement('div');
    div.className = "toaster";
    div.innerHTML = `<h3> ${msg}</h3> `
    setTimeout(() => {
        div.style.transform = 'translateX(0)';
    }, 1000)
    main.appendChild(div);
    setTimeout(() => {
        div.style.transform = 'translateX(600px)';
    }, 3000)
    setTimeout(() => {
        main.removeChild(main.children[3]);
    }, 4000)
}

// when the user disconnect
socket.on('disconnectMsg', (msg) => {
    console.log(msg);
    toasterFunc(msg);
    setTimeout(removeChild, 2000);

})

// remove the user's window
const removeChild = () => {
    for (let i = 0; i < videoGrid.childElementCount; i++) {
        let check = videoGrid.children[i].srcObject.getVideoTracks()[0].muted;
        console.log(check);
        if (check === true) {
            console.log('remove')
            videoGrid.removeChild(videoGrid.childNodes[i]);
        }
    }
}



// add video stream
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.appendChild(video);
    // dynamically partitioning
    if (videoGrid.children.length < 4)
        videoGrid.style.gridTemplateColumns = `repeat(auto - fit, minmax(350px, 1fr))`

}

// redirect to create / join page
socket.on('redirect', () => {
    peer.destroy();
    window.location.assign(`http://localhost:3000/logout`);
})


// chat part
// messages
const msg = document.querySelector('input');
msg.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        socket.emit('message', msg.value);
        msg.value = '';
    }
})

// scrollToBottom() functionality
const msg_window = document.querySelector('.main__chat__window');
const scrollToBottom = () => {
    msg_window.scrollTop = msg_window.scrollHeight;
}

// display the messages
const msgContainer = document.querySelector('.messages')
socket.on('createMessage', message => {
    const li = document.createElement('li');
    li.style.overflowWrap = 'break-word';
    li.classList.add('message')
    li.innerHTML = `<b>${message.username}</b> 
                    <small>${message.time}</small>
                    <br>
                    ${message.text}
                    `;
    msgContainer.appendChild(li);
    scrollToBottom();
})

// mute our video

const muteButton = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnMuteButton();
    }
    else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `<i class="fas fa-microphone"></i>
        <span>Mute</span>
    `
    document.querySelector('.main__mute__button').innerHTML = html;
}
const setUnMuteButton = () => {
    const html = `<i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `
    document.querySelector('.main__mute__button').innerHTML = html;
}



//hide the video
const hideVideo = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setShowVideo();
        socket.emit('ManageImgVideo', myVideoStream.id);

    }
    else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        setHideVideo();
        socket.emit('ManageImgVideo', myVideoStream.id);

    }
}

const setHideVideo = () => {
    const html = `<i class="fas fa-video"></i>
        <span>Stop</span>
    `
    document.querySelector('.main__hide__button').innerHTML = html;
}
const setShowVideo = () => {
    const html = `<i class="showVideo fas fa-video-slash"></i>
        <span>Play</span>
    `
    document.querySelector('.main__hide__button').innerHTML = html;
}
