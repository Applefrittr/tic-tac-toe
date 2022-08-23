// our player factory function
const Player = (name, turn, ai) => {
    return {name, turn, ai}
}
// tic tac toe grid factory function
const GameGrid = () => {
    // private array to represent tic tac toe grid
    let grid = ['','','','','','','','','']
    let gameOver = false

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
        if (!gameOver && grid.every(box => box != '')) {
            setTimeout(function() {
                gameOverOverlay.style.display = 'flex'
                gameOverMsg.textContent = `Tie`
                gameOverModal.style.backgroundColor = 'white'
            }, 500)
        }
    }

    // private method used in both winner() and tie() methods to display gameOver modal
    const endGame = (player) =>   {
        setTimeout(function() {
            gameOverOverlay.style.display = 'flex'
            gameOverMsg.textContent = `${player} is the Winner!`
            if (player == 'X') gameOverModal.style.backgroundColor = 'violet'
            else gameOverModal.style.backgroundColor = 'turquoise'
        }, 500)
        gameOver = true
    }

    // clears all player classes and empties grid array in preperation for next game
    const clearBoard = () =>    {
        squares.forEach(square => {
            square.textContent = ''
            square.classList.remove('X')
            square.classList.remove('O')
        })
        for (let a = 0; a < grid.length; a++) grid[a] = ''
        gameOver = false
    }

    return {fill, clearBoard, grid, winner}
}

// our seletors
const pvpBtn = document.querySelector('#pvp')
const pveBtn = document.querySelector('#pve')
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
const chooseOverlay = document.querySelector('#choose-player-overlay')
let chooseX = document.querySelector('#chooseX')
let chooseO = document.querySelector('#chooseO')


//create 2 players, X and O
let X = Player('X', false, false)
let O = Player('O', false, false)

//greate our gameboard instance
let gameBoard = GameGrid()

// gamemode PVP selected from splash page
pvpBtn.addEventListener('click', () => {
    X.turn = true
    boardOverlay.style.display = 'flex'
    splash.style.display = 'none'
    playerXIcon.classList.toggle('playerX-active')

})

// event listeners when an available square on the tic tac toe gameboard is selected by the current player w/ integrated AI logic if pve gamemode is selected.  Determined by AI element in each Player instance
squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (X.turn && !square.textContent) {
            gameBoard.fill(X, O, square)
            // Uses random number generator to pick an available square while still available
            if (O.ai == true && gameBoard.grid.some((box) => box === '')) {
                let x = Math.floor(Math.random() * 9)
                let square = document.getElementById(x)
                while(square.textContent) {
                    x = Math.floor(Math.random() * 9)
                    square = document.getElementById(x)
                }
                gameBoard.fill(O, X, square)       
            }
        } else if (O.turn && !square.textContent) {
            gameBoard.fill(O, X, square)
            // Uses random number generator to pick an available square while still available
            if (X.ai == true && gameBoard.grid.some((box) => box === '')) {
                let x = Math.floor(Math.random() * 9)
                let square = document.getElementById(x)
                while(square.textContent) {
                    x = Math.floor(Math.random() * 9)
                    square = document.getElementById(x)
                }
                gameBoard.fill(X, O, square)       
            }
        } else return
    })
})

// new game is seleted on the gamewinner banner.  Clears agmeBoard grid and player classes from squares add during previous game
newGame.addEventListener('click', () => {
    gameBoard.clearBoard()
    gameOverOverlay.style.display = 'none'
    X.turn = true
    O.turn = false
    playerXIcon.classList.add('playerX-active')
    playerOIcon.classList.remove('playerO-active')

    if (X.ai == true)   {
        let x = Math.floor(Math.random() * 9)
        let square = document.getElementById(x)
        gameBoard.fill(X, O, square)
    }
})

// home is selected on the gamewinner banner, returns to splash page and empties gameBoard grid and removes player classes from squares and sets Player instances to initial state
home.addEventListener('click', () => {
    gameBoard.clearBoard()
    gameOverOverlay.style.display = 'none'
    boardOverlay.style.display = 'none'
    splash.style.display = 'flex'
    X.ai = false
    O.ai = false
    X.turn = true
    O.turn = false
    playerXIcon.classList.remove('playerX-active')
    playerOIcon.classList.remove('playerO-active')
})

// pvAI game mode, will display Choose Player Overlay
pveBtn.addEventListener('click', () => {
    X.turn = true
    O.turn = false
    chooseOverlay.style.display = 'flex'
})

// PLayer chooses O, making Player X the AI, and will execute the first move
chooseO.addEventListener('click', () => {
    X.ai = true

    chooseOverlay.style.display = 'none'
    splash.style.display = 'none'
    boardOverlay.style.display = 'flex'
    playerXIcon.classList.add('playerX-active')
    
    let x = Math.floor(Math.random() * 9)
    let square = document.getElementById(x)
    gameBoard.fill(X, O, square)
    console.log(X.turn)
})

//Player Chooses X, making PLayer O the AI
chooseX.addEventListener('click', () => {
    O.ai = true

    chooseOverlay.style.display = 'none'
    splash.style.display = 'none'
    boardOverlay.style.display = 'flex'
    playerXIcon.classList.add('playerX-active')
})

