const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    const msgCont = document.getElementById('message-container');
    // Scroll Height
    msgCont.scrollTop = msgCont.scrollHeight;
});

// Get username from URL

const name = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const nameValue = Object.values(name)[0];

console.log(Object.values(name)[0]);

// Send the name toh the server

socket.emit('username', nameValue);

const inputMsg = document.getElementById('chat-input');
const send = document.getElementById('btn');

send.addEventListener('click', (e)=>{
        e.preventDefault();
            const inputMsgVal = inputMsg.value;
            socket.emit('input', inputMsgVal);
            document.getElementById('chat-input').value = '';
});


function outputMessage(message) {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<h6>${message.username} ${hours}:${minutes}</h6>
        <h4>${message.text}</h4>`;
        document.getElementById('messages').appendChild(div);
}

