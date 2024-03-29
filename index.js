const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = [] 
let turnPlayer = ''

function updateTitle () {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame (){
    //Inicia as variáveis globais 
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    //Reinicia o título se necessário
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    //Limpa o tabuleiro (se necessário) e adiciona evento de click
    boardRegions.forEach(function(element){
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

//verifica se existe três regiões iguais em sequência e devolve as regiões
function getWinRegions () {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push('0.0', '0.1', '0.2')
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

//Desabilita uma região do tabuleiro para que não seja mais clicável
function disableRegion (element) {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
} 

//pinta as regiões onde o jogador venceu e mostra seu nome na tela
function handleWin (regions) {
    regions.forEach(function(region){
        document.querySelector('[data-region="' + region + '"]').classList.add  ('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' Venceu!'
}

function handleBoardClick (ev) {
    //obtem o índice da região clicada
    const span = ev.currentTarget
    const region = span.dataset.region // N.N
    const rowColumnPair = region.split('.') // ["N", "N"]
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    //Marca a coluna clicada com o símbolo do jogador
    if (turnPlayer === 'player1'){
        span.innerText = "X"
        vBoard[row][column] = 'X'
    }
    else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
     
    //Limpa o console e exibe tabuleiro virtual
    console.clear()
    console.table(vBoard)
    //Desabilita a região clicada
    disableRegion(span)
    //verifica de alguém venceu
    const winRegions = getWinRegions()
    if ( winRegions.length > 0){
    handleWin(winRegions)
    }
    else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    }
    else {
        document.querySelector('h2').innerText = 'Empate!'
    }
}    
    //Adiciona evento ao botão que inicia o jogo
    document.querySelector('#start').addEventListener('click', initializeGame)


