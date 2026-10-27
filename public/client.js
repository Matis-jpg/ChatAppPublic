const socket = io()

const form = document.querySelector('form')
const username = document.getElementById('username')
const input = document.getElementById('input')

function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16)
    return `#${hex.padStart(6, '0')}`
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if(!(username.value.trim() === "") && !(input.value.trim() === "")) {
        socket.emit('message', {'username': username.value.trim(), 'message': input.value.trim()})
        input.value = ""
    }
})

socket.on('message', (msg) => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.setAttribute('class', 'username')
    span.style = `color: ${getRandomHexColor()}`
    span.textContent = msg.username
    li.append(span, msg.message)
    document.getElementById('messages').appendChild(li)
    unleashChaos()
})

function unleashChaos() {
    const style = document.createElement("style");

    style.textContent = `
        @keyframes chaos-spin {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            to { transform: rotate(360deg) scale(1); }
        }

        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }

        @keyframes wiggle {
            0%,100% { transform: translate(0,0); }
            25% { transform: translate(5px,-5px); }
            50% { transform: translate(-5px,5px); }
            75% { transform: translate(5px,5px); }
        }

        body {
            animation:
                rainbow 1s linear infinite,
                wiggle 0.1s infinite !important;
            overflow-x: hidden;
        }

        * {
            animation:
                chaos-spin 3s linear infinite,
                rainbow 2s linear infinite !important;
            transform-origin: center center;
            transition: all 0.1s;
        }
    `;

    document.head.appendChild(style);

    setInterval(() => {
        document.querySelectorAll("*").forEach(el => {
            el.style.position = "relative";
            el.style.left = `${Math.sin(Date.now()/100 + Math.random()) * 20}px`;
            el.style.top = `${Math.cos(Date.now()/100 + Math.random()) * 20}px`;
            el.style.fontSize = `${10 + Math.random() * 40}px`;
            el.style.letterSpacing = `${Math.random() * 10}px`;
        });
    }, 100);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    setInterval(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.frequency.value = 100 + Math.random() * 1500;
        gain.gain.value = 0.01;

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }, 200);

    console.log("🔥 CHAOS MODE ACTIVATED 🔥");
}