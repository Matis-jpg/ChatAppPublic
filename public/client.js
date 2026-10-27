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
})