const gameBoard = (() =>{
let gameboard = ["","","","","","","","",""]

    const render = () => {
        let boardHTML = ""
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`
        })
    }
    document.querySelector("#gameboard").innerHTML = boardHTML

    return{
        render,
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
    let currentPlayersIndex = 0
    let gameOver = false

    const star = () => {
        players = [

        ]
        }
    }

})

const startBnt = document.querySelector("#bnt-start")
startBnt.addEventListener("click", () => {

})