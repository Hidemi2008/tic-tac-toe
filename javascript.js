const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message
    }
    return {
        renderMessage,
    }
})()

const gameBoard = (() =>{
let gameboard = ["","","","","","","","",""]

    const render = () => {
        let boardHTML = ""
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML
        const squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick)
        })
    }

const update = (index,value) => {
    gameboard[index] = value
    render()
}
 
const getGameboard = () => gameboard


    return{
        render,
        update,
        getGameboard
    }

})();

const createPlayer= (name,mark) => {
    return{
        name,
        mark
    }
}

const Game = (() => {
    let players = []
    let currentPlayersIndex
    let gameOver

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayersIndex = 0
        gameOver = false
        gameBoard.render()
        const squares = document.querySelectorAll(".square")
        squares.forEach((square) => {
            square.addEventListener("click", handleClick)
        })
        }

        const handleClick = (event) => {
            if(gameOver){
                return 
            }
            let index = parseInt(event.target.id.split("-")[1])

            if (gameBoard.getGameboard()[index] !== "")
                return;
            
                
            
            gameBoard.update(index, players
            [currentPlayersIndex].mark)


            if(checkForWin(gameBoard.getGameboard(), players[currentPlayersIndex].mark)){
                gameOver = true
                displayController.renderMessage(`${players[currentPlayersIndex].name} wins`)
            }else if(checkForTie(gameBoard.getGameboard())){
                gameOver = true
            displayController.renderMessage(`It's tie`)
            }

            currentPlayersIndex = currentPlayersIndex === 0 ? 1 : 0
        }

        const restart = () => {
            for(let i = 0; i < 9; i++){
                gameBoard.update(i, "")
            }
            gameBoard.render()
            gameOver = false
            document.querySelector("#message").innerHTML = ""
        }

        return{
            start,
            restart,
            handleClick
        }
})();

function checkForWin(board){
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true
        }
    }
    return false
}

function checkForTie(board){
    return board.every(cell => cell !== "")
}

const restartBnt = document.querySelector("#bnt-restart")
restartBnt.addEventListener("click", () =>{
    Game.restart()
})

const startBnt = document.querySelector("#bnt-start")
startBnt.addEventListener("click", () => {
    Game.start()
})