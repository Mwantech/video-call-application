
// public/client.js
const socket = io();
let localStream;
let peerConnection;

const config = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

async function startCall(isVideo) {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: isVideo,
            audio: true
        });
        document.getElementById('localVideo').srcObject = localStream;

        peerConnection = new RTCPeerConnection(config);
        
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.ontrack = event => {
            document.getElementById('remoteVideo').srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, 'testRoom');
            }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer, 'testRoom');
        socket.emit('join', 'testRoom');

    } catch (err) {
        console.error('Error starting call:', err);
    }
}

socket.on('offer', async offer => {
    try {
        peerConnection = new RTCPeerConnection(config);
        
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.ontrack = event => {
            document.getElementById('remoteVideo').srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, 'testRoom');
            }
        };

        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer, 'testRoom');

    } catch (err) {
        console.error('Error handling offer:', err);
    }
});

socket.on('answer', async answer => {
    try {
        await peerConnection.setRemoteDescription(answer);
    } catch (err) {
        console.error('Error handling answer:', err);
    }
});

socket.on('candidate', async candidate => {
    try {
        await peerConnection.addIceCandidate(candidate);
    } catch (err) {
        console.error('Error handling ICE candidate:', err);
    }
});

function endCall() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
        peerConnection.close();
    }
    document.getElementById('localVideo').srcObject = null;
    document.getElementById('remoteVideo').srcObject = null;
    socket.emit('endCall', 'testRoom');
}

socket.on('callEnded', endCall);

document.getElementById('startCall').onclick = () => startCall(false);
document.getElementById('startVideo').onclick = () => startCall(true);
document.getElementById('endCall').onclick = endCall;