function Player(name, turn) {
    this.name = name
    this.turn = turn
}

const pvpBtn = document.querySelector('#pvp')
const boardOverlay = document.querySelector('#game-board-overlay')
const splash = document.querySelector('#splash-page')
const playerXIcon = document.querySelector('#playerX')
const playerOIcon = document.querySelector('#playerO')
const grid = document.querySelectorAll('.square')

let X = new Player('x', true)
let O = new Player('O', false)


pvpBtn.addEventListener('click', () => {
    boardOverlay.style.display = 'flex'
    splash.style.display = 'none'
    playerXIcon.classList.toggle('playerX-active')

})

grid.forEach((square) => {
    square.addEventListener('click', () => {
        playerXIcon.classList.toggle('playerX-active')
        playerOIcon.classList.toggle('playerO-active')

        if (X.turn) {
            square.textContent = 'X'
            square.classList.add('X')
        } else {
            square.textContent = 'O'
            square.classList.add('O')
        }

        X.turn = !X.turn
        O.turn = !O.turn
    })
})
