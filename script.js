// our player factory function
const Player = (name, turn) => {
    return {name, turn}
}
// tic tac toe grid factory function
const GameGrid = () => {
    // private array to represent tic tac toe grid
    let grid = ['','','','','','','','','']

    // method fill() made public to work with EventListeners.  Will call both winner() & tie() (private methods)
    // when a player selects an available square to detect any game ending conditions
    const fill = (player1, player2, square) => {
        square.textContent = player1.name
        square.classList.add(player1.name)
        player1.turn = !player1.turn
        player2.turn = !player2.turn
        playerXIcon.classList.toggle('playerX-active')
        playerOIcon.classList.toggle('playerO-active')
        grid[square.id] = player1.name
        winner()
        tie()
    }
    
    //logic to detect winner - 8 possibilities.  Calls endGame() if winner detected
    const winner = () => {
        if (grid[0] && grid[0] == grid[1] && grid[1] == grid[2])    {
            endGame(grid[0])
        } else if (grid[3] && grid[3] == grid[4] && grid[4] == grid[5])    {
            endGame(grid[3])
        } else if (grid[6] && grid[6] == grid[7] && grid[7] == grid[8])    {
            endGame(grid[6])
        } else if (grid[0] && grid[0] == grid[3] && grid[3] == grid[6])    {
            endGame(grid[0])
        } else if (grid[1] && grid[1] == grid[4] && grid[4] == grid[7])    {
            endGame(grid[1])
        } else if (grid[2] && grid[2] == grid[5] && grid[5] == grid[8])    {
            endGame(grid[2])
        } else if (grid[0] && grid[0] == grid[4] && grid[4] == grid[8])    {
            endGame(grid[0])
        } else if (grid[0] && grid[0] == grid[3] && grid[3] == grid[6])    {
            endGame(grid[0])
        } else if (grid[6] && grid[6] == grid[4] && grid[4] == grid[2])    {
            endGame(grid[6])
        } else return
    }

    // logic to detect tie
    const tie = () => {
        if (grid.every(square => square != '')) alert(`It's a tie!`)
    }

    // private method used in both winner() and tie() methods to display gameOver modal
    const endGame = (player) =>   {
        setTimeout(function() {
            gameOverOverlay.style.display = 'flex'
            gameOverMsg.textContent = `${player} is the Winner!`
            if (player == 'X') gameOverModal.style.backgroundColor = 'violet'
            else gameOverModal.style.backgroundColor = 'turquoise'
        }, 500)
    }

    // clears all player classes and empties grid array in preperation for next game
    const clearBoard = () =>    {
        squares.forEach(square => {
            square.textContent = ''
            square.classList.remove('X')
            square.classList.remove('O')
        })
        for (let a = 0; a < grid.length; a++) grid[a] = ''
    }

    // only need to make fill() and clearBoard() public to work with button event listeners
    return {fill, clearBoard}
}


const pvpBtn = document.querySelector('#pvp')
const boardOverlay = document.querySelector('#game-board-overlay')
const splash = document.querySelector('#splash-page')
const playerXIcon = document.querySelector('#playerX')
const playerOIcon = document.querySelector('#playerO')
const squares = document.querySelectorAll('.square')
const gameOverOverlay = document.querySelector('#game-over-overlay')
const gameOverModal = document.querySelector('#game-over-modal')
const gameOverMsg = document.querySelector('#game-over-msg')
const newGame = document.querySelector('#newGame')
const home = document.querySelector('#home')

let X = Player('X', true)
let O = Player('O', false)

let gameBoard = GameGrid()


pvpBtn.addEventListener('click', () => {
    boardOverlay.style.display = 'flex'
    splash.style.display = 'none'
    playerXIcon.classList.toggle('playerX-active')

})

squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (X.turn && !square.textContent) {
            gameBoard.fill(X, O, square)
        } else if (O.turn && !square.textContent) {
            gameBoard.fill(O, X, square)
        } else return
    })
})

newGame.addEventListener('click', () => {
    gameBoard.clearBoard()
    gameOverOverlay.style.display = 'none'
    X.turn = true
    O.turn = false
    playerXIcon.classList.add('playerX-active')
    playerOIcon.classList.remove('playerO-active')

})

home.addEventListener('click', () => {
    gameBoard.clearBoard()
    gameOverOverlay.style.display = 'none'
    boardOverlay.style.display = 'none'
    splash.style.display = 'flex'
    X.turn = true
    O.turn = false
    playerXIcon.classList.remove('playerX-active')
    playerOIcon.classList.remove('playerO-active')
})