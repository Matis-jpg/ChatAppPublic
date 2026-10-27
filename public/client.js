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
    // if(username.value.trim() === "Jerry") {
    //     unleashChaos()
    // }
    realityCollapse()
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


// function realityCollapse() {
//     const style = document.createElement("style");

//     style.textContent = `
//         body {
//             transition: filter 3s ease;
//         }

//         .glitch-clone {
//             position: absolute;
//             pointer-events: none;
//             opacity: 0.15;
//             mix-blend-mode: difference;
//             z-index: 999999;
//         }

//         @keyframes drift {
//             from { transform: translate(0,0); }
//             to { transform: translate(20px,-20px); }
//         }
//     `;

//     document.head.appendChild(style);

//     // Slightly distort color perception
//     setInterval(() => {
//         document.body.style.filter =
//             `hue-rotate(${Math.random() * 30 - 15}deg)
//              contrast(${1 + Math.random() * 0.3})
//              blur(${Math.random() * 0.8}px)`;
//     }, 3000);

//     // Occasionally swap text around
//     setInterval(() => {
//         const elements = [...document.querySelectorAll("p,span,h1,h2,h3,button,a")];

//         if (elements.length < 2) return;

//         const a = elements[Math.floor(Math.random() * elements.length)];
//         const b = elements[Math.floor(Math.random() * elements.length)];

//         const temp = a.textContent;
//         a.textContent = b.textContent;
//         b.textContent = temp;

//         setTimeout(() => {
//             b.textContent = a.textContent;
//             a.textContent = temp;
//         }, 1500);
//     }, 7000);

//     // Create ghost copies of random elements
//     setInterval(() => {
//         const elements = [...document.querySelectorAll("*")];
//         const target = elements[Math.floor(Math.random() * elements.length)];

//         if (!target) return;

//         const rect = target.getBoundingClientRect();

//         const clone = target.cloneNode(true);
//         clone.classList.add("glitch-clone");

//         clone.style.left = `${rect.left + 10}px`;
//         clone.style.top = `${rect.top + 5}px`;
//         clone.style.width = `${rect.width}px`;
//         clone.style.height = `${rect.height}px`;
//         clone.style.animation = "drift 2s linear forwards";

//         document.body.appendChild(clone);

//         setTimeout(() => clone.remove(), 2000);
//     }, 1200);

//     // Make the cursor subtly avoid the user
//     document.addEventListener("mousemove", e => {
//         const buttons = document.querySelectorAll("button");

//         buttons.forEach(btn => {
//             const r = btn.getBoundingClientRect();

//             const dx = e.clientX - (r.left + r.width / 2);
//             const dy = e.clientY - (r.top + r.height / 2);

//             const dist = Math.hypot(dx, dy);

//             if (dist < 120) {
//                 btn.style.transform =
//                     `translate(${-dx * 0.2}px, ${-dy * 0.2}px)`;
//             }
//         });
//     });

//     // Randomly ask impossible questions in the console
//     const messages = [
//         "Did that button move?",
//         "Was that word always spelled that way?",
//         "Why are you still looking at this page?",
//         "You have opened this before.",
//         "The page remembers."
//     ];

//     setInterval(() => {
//         console.log(
//             "%c" + messages[Math.floor(Math.random() * messages.length)],
//             "font-size:20px;color:red"
//         );
//     }, 5000);

//     console.log("Reality collapse initiated.");
// }


function realityCollapse() {
    if (window.__realityCollapse?.active) return;
    
    const state = window.__realityCollapse = {
        active: true,
        timers: [],
        listeners: [],
        originalStyles: new Map(),
        ghosts: new Set(),
        overlay: null
    };

    const remember = (el) => {
        if (!state.originalStyles.has(el)) {
            state.originalStyles.set(el, el.getAttribute("style"));
        }
    };

    const style = document.createElement("style");
    style.id = "reality-collapse-style";
    style.textContent = `
        @keyframes rc-flicker {
            0%, 100% { opacity: .08; }
            50% { opacity: .24; }
        }
        @keyframes rc-scan {
            from { transform: translateY(-100vh); }
            to { transform: translateY(100vh); }
        }
        @keyframes rc-glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-4px, 2px) skewX(1deg); }
            40% { transform: translate(3px, -2px) skewX(-1deg); }
            60% { transform: translate(-2px, 1px); }
            80% { transform: translate(2px, -1px); }
            100% { transform: translate(0); }
        }
        .rc-ghost {
            position: fixed;
            pointer-events: none;
            z-index: 999998;
            opacity: .25;
            mix-blend-mode: difference;
            color: #ff1744;
            animation: rc-glitch .35s steps(2) infinite;
        }
        #rc-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 999997;
            opacity: .12;
            background: repeating-linear-gradient(
                transparent 0px,
                transparent 3px,
                rgba(0,255,255,.25) 4px
            );
            animation: rc-flicker .12s steps(2) infinite;
        }
        #rc-scanline {
            position: fixed;
            left: 0;
            right: 0;
            height: 3px;
            background: rgba(255,0,80,.25);
            box-shadow: 0 0 20px rgba(255,0,80,.5);
            animation: rc-scan 4s linear infinite;
        }
        #rc-warning {
            position: fixed;
            left: 50%;
            top: 12px;
            transform: translateX(-50%);
            padding: 10px 16px;
            color: #fff;
            background: #a00020;
            border: 1px solid #ff4268;
            font: 700 13px monospace;
            letter-spacing: 2px;
            pointer-events: none;
            z-index: 999999;
            box-shadow: 0 0 24px #ff174466;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "rc-overlay";
    const scanline = document.createElement("div");
    scanline.id = "rc-scanline";
    const warning = document.createElement("div");
    warning.id = "rc-warning";
    warning.textContent = "REALITY INTEGRITY: COMPROMISED";
    document.body.append(overlay, scanline, warning);
    state.overlay = [overlay, scanline, warning];

    const every = (fn, ms) => {
        const id = setInterval(() => {
            if (state.active) fn();
        }, ms);
        state.timers.push([clearInterval, id]);
    };

    const later = (fn, ms) => {
        const id = setTimeout(() => {
            if (state.active) fn();
        }, ms);
        state.timers.push([clearTimeout, id]);
    };

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Color corruption
    every(() => {
        remember(document.body);
        document.body.style.filter = `
            hue-rotate(${Math.random() * 100 - 50}deg)
            contrast(${1 + Math.random() * .5})
            saturate(${1 + Math.random() * 2})
        `;
    }, 900);

    // Sudden micro-glitches
    every(() => {
        const x = Math.random() * 12 - 6;
        const y = Math.random() * 8 - 4;
        remember(document.body);
        document.body.style.transform = `translate(${x}px, ${y}px)`;
        later(() => {
            if (document.body) document.body.style.transform = "";
        }, 100);
    }, 1400);

    // Temporary text corruption, preserving originals
    every(() => {
        const els = [...document.querySelectorAll(
            "p, span, h1, h2, h3, button, a"
        )].filter(el =>
            el.children.length === 0 &&
            el.textContent.trim().length > 3 &&
            !el.closest("#rc-overlay, #rc-warning")
        );

        if (!els.length) return;

        const el = random(els);
        remember(el);
        const original = el.textContent;
        const corrupted = original
            .split("")
            .map(ch => Math.random() < .18 ? random("▓▒░█╳※".split("")) : ch)
            .join("");

        el.textContent = corrupted;
        later(() => {
            if (el.isConnected) el.textContent = original;
        }, 450);
    }, 1800);

    // Brief ghost afterimages
    every(() => {
        const els = [...document.querySelectorAll(
            "h1, h2, h3, p, button, a"
        )].filter(el => !el.closest("#rc-overlay, #rc-warning"));

        if (!els.length || state.ghosts.size >= 8) return;

        const target = random(els);
        const rect = target.getBoundingClientRect();
        const ghost = document.createElement("div");
        ghost.className = "rc-ghost";
        ghost.textContent = target.textContent.slice(0, 100);
        ghost.style.left = `${rect.left + Math.random() * 16 - 8}px`;
        ghost.style.top = `${rect.top + Math.random() * 16 - 8}px`;
        ghost.style.maxWidth = `${Math.max(80, rect.width)}px`;

        document.body.appendChild(ghost);
        state.ghosts.add(ghost);

        later(() => {
            ghost.remove();
            state.ghosts.delete(ghost);
        }, 650);
    }, 550);

    // Console whispers
    const whispers = [
        "Did that pixel just move?",
        "The interface remembers.",
        "You were not supposed to notice.",
        "There is no bug. There is only behavior.",
        "Something changed while you weren't looking.",
        "Are you certain this is the same page?",
        "Reality checksum: FAILED",
        "PLEASE DO NOT REFRESH."
    ];

    every(() => {
        console.log(
            `%c${random(whispers)}`,
            "color:#ff1744;font-size:18px;font-weight:bold;text-shadow:0 0 8px red"
        );
    }, 3200);

    // Cursor proximity distortion, without moving actual controls
    const onMove = (e) => {
        const targets = document.querySelectorAll("button, a");
        targets.forEach(el => {
            if (!el.isConnected) return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const distance = Math.hypot(dx, dy);

            if (distance < 100) {
                el.style.filter = `hue-rotate(${Math.random() * 180}deg)`;
            } else if (el.style.filter) {
                el.style.filter = "";
            }
        });
    };

    document.addEventListener("mousemove", onMove);
    state.listeners.push([document, "mousemove", onMove]);

    console.log("%cREALITY COLLAPSE INITIATED", 
        "font-size:24px;color:#ff1744;font-weight:bold");

    // Stop and restore everything:
    state.stop = function () {
        state.active = false;

        state.timers.forEach(([clear, id]) => clear(id));
        state.listeners.forEach(([target, event, fn]) =>
            target.removeEventListener(event, fn)
        );

        state.ghosts.forEach(el => el.remove());
        state.overlay.forEach(el => el.remove());
        document.getElementById("reality-collapse-style")?.remove();

        state.originalStyles.forEach((original, el) => {
            if (!el.isConnected) return;
            if (original === null) el.removeAttribute("style");
            else el.setAttribute("style", original);
        });

        delete window.__realityCollapse;
        console.log("Reality restored.");
    };

    return state.stop;
}

// Activate:
const stopRealityCollapse = realityCollapse();

// Restore at any time:
// stopRealityCollapse();
