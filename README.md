# End-to-End Encrypted Video Call Application

A secure, peer-to-peer video calling application built with Node.js, WebRTC, and Socket.IO featuring end-to-end encryption for both signaling and media streams.

## Features

- 🔒 End-to-end encryption for all communications
- 📹 Support for both video and audio calls
- 🔄 Real-time peer-to-peer connection
- 🛑 Call start/end functionality
- 🔐 DTLS-SRTP encryption for media streams
- 🔑 AES-GCM encryption for signaling data

## Security Features

- WebRTC's built-in DTLS-SRTP encryption for media streams
- AES-GCM 256-bit encryption for signaling data
- Perfect Forward Secrecy via DTLS
- Secure key exchange mechanism
- No plaintext data transmission
- Server acts only as a relay and cannot decrypt messages

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd secure-video-call
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Access the application:
   - Open http://localhost:3000 in two different browser windows
   - For testing between different devices, ensure they're on the same network or deploy to a server with HTTPS

## Usage

1. Starting a Call:
   - Click "Start Video" for video+audio call
   - Click "Start Call" for audio-only call
   - Accept camera/microphone permissions when prompted

2. Ending a Call:
   - Click "End Call" to terminate the connection
   - Both parties will be disconnected
   - All streams will be properly cleaned up

## Security Testing

### Network Traffic Analysis
```bash
# Install Wireshark
sudo apt-get install wireshark  # Ubuntu/Debian
brew install wireshark          # macOS

# Capture traffic
wireshark -i any -f "port 3000"
```

### Expected Security Observations
- All WebRTC media packets should show as DTLS/SRTP encrypted
- Signaling messages should appear as encrypted binary data
- No visible plaintext SDP or ICE candidates
- No readable media content in captured packets

## Architecture

```
Client A                Server                 Client B
   |                      |                      |
   |-- Encrypted Offer -->|-- Encrypted Offer -->|
   |                      |                      |
   |<- Encrypted Answer --|<- Encrypted Answer --|
   |                      |                      |
   |-------- Encrypted Media Stream ------------>|
   |<------- Encrypted Media Stream -------------|
```

## Development and Contributions

### Setting Up Development Environment
1. Fork the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test thoroughly
5. Submit pull request

### Testing
- Run basic tests: `npm test`
- Security tests: See Security Testing section
- Browser compatibility tests recommended

## Troubleshooting

### Common Issues

1. Connection Failures
   - Check firewall settings
   - Ensure STUN server is accessible
   - Verify both peers are on compatible browsers

2. Media Issues
   - Check camera/microphone permissions
   - Verify device connections
   - Clear browser cache if needed

3. Security Warnings
   - Ensure server is running HTTPS in production
   - Check for console errors related to encryption
   - Verify all security dependencies are up to date

## License

MIT License - See LICENSE file for details

## Disclaimer

This application implements strong security measures but should be independently verified before use in production environments. Regular security audits are recommended.