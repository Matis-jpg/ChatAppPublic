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
    if(message.username === "Jerry") {
        unleashChaos()
    }
    if(message.unleashChaos === "Jeremy") {
        realityCollapse()
    } 
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


function realityCollapse() {
    const style = document.createElement("style");

    style.textContent = `
        body {
            transition: filter 3s ease;
        }

        .glitch-clone {
            position: absolute;
            pointer-events: none;
            opacity: 0.15;
            mix-blend-mode: difference;
            z-index: 999999;
        }

        @keyframes drift {
            from { transform: translate(0,0); }
            to { transform: translate(20px,-20px); }
        }
    `;

    document.head.appendChild(style);

    // Slightly distort color perception
    setInterval(() => {
        document.body.style.filter =
            `hue-rotate(${Math.random() * 30 - 15}deg)
             contrast(${1 + Math.random() * 0.3})
             blur(${Math.random() * 0.8}px)`;
    }, 3000);

    // Occasionally swap text around
    setInterval(() => {
        const elements = [...document.querySelectorAll("p,span,h1,h2,h3,button,a")];

        if (elements.length < 2) return;

        const a = elements[Math.floor(Math.random() * elements.length)];
        const b = elements[Math.floor(Math.random() * elements.length)];

        const temp = a.textContent;
        a.textContent = b.textContent;
        b.textContent = temp;

        setTimeout(() => {
            b.textContent = a.textContent;
            a.textContent = temp;
        }, 1500);
    }, 7000);

    // Create ghost copies of random elements
    setInterval(() => {
        const elements = [...document.querySelectorAll("*")];
        const target = elements[Math.floor(Math.random() * elements.length)];

        if (!target) return;

        const rect = target.getBoundingClientRect();

        const clone = target.cloneNode(true);
        clone.classList.add("glitch-clone");

        clone.style.left = `${rect.left + 10}px`;
        clone.style.top = `${rect.top + 5}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.animation = "drift 2s linear forwards";

        document.body.appendChild(clone);

        setTimeout(() => clone.remove(), 2000);
    }, 1200);

    // Make the cursor subtly avoid the user
    document.addEventListener("mousemove", e => {
        const buttons = document.querySelectorAll("button");

        buttons.forEach(btn => {
            const r = btn.getBoundingClientRect();

            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);

            const dist = Math.hypot(dx, dy);

            if (dist < 120) {
                btn.style.transform =
                    `translate(${-dx * 0.2}px, ${-dy * 0.2}px)`;
            }
        });
    });

    // Randomly ask impossible questions in the console
    const messages = [
        "Did that button move?",
        "Was that word always spelled that way?",
        "Why are you still looking at this page?",
        "You have opened this before.",
        "The page remembers."
    ];

    setInterval(() => {
        console.log(
            "%c" + messages[Math.floor(Math.random() * messages.length)],
            "font-size:20px;color:red"
        );
    }, 5000);

    console.log("Reality collapse initiated.");
}