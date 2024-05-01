const cell = function(){
    let value = ""; 

    const newValue = (player) => value = player.mark;

    const getValue = () => value;

    return {newValue , getValue};
}

const gameBoard = function(){
    const columns = 3;
    const rows = 3;
    const board = [];
    const cellule = cell();

    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
        board[i][j] = cellule.getValue();
        }
    }
    const getBoard = ()=> board;

    const addMark = function(player, i, j){
      
        if(board[i][j] == ""){
            board[i][j] = cellule.newValue(player);
           
        }
    }
        const printBoard = function(){
            let j = 0;
             for (let i = 0; i < rows; i++) {
                  console.log("\n");
                  console.log(`\t${board[i][j]}\t${board[i][j + 1]}\t${board[i][j + 2]}`);   
             }
         }    
       
    
    return {getBoard , addMark, printBoard}
}

function player(name, mark){
    
    return {name , mark};
}

let player1 = player("player1","X");
let player2 = player("player2","O");

const gameController = function(){

    let activePlayer = player2;

    const getActivePlayer = ()=> activePlayer;

    const switchPlayer = function(){
        activePlayer = activePlayer === player1 ? player2 : player1
    }

    return {getActivePlayer, switchPlayer}
}


function screenController(){
    let winner = "";
   
    const  playGame = gameBoard();
    const  control = gameController();
 
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = function(){
        let i = 0, j = 0;

        boardDiv.textContent = "";

        const turnStartBtn =document.querySelector(".start button");

        turnStartBtn.addEventListener("click", ()=> {
            turnDiv.textContent = `${control.getActivePlayer().name} turn's`
        })

        const board = playGame.getBoard();

        board.forEach((row) => 
            {   i++;
                j = 0;
                row.forEach((box) => {
                j++;    
            const boxButton = document.createElement("button");
            
            boxButton.setAttribute("data-row",`${i - 1}`)
            boxButton.setAttribute("data-col",`${j - 1}`)
            boxButton.classList.add("box");

            boardDiv.appendChild(boxButton);


            const restartBtn = document.querySelector(".restart");

            restartBtn.addEventListener("click", ()=>{
                
                const columns = 3;
                const rows = 3;
                
                const cellule = cell();
    
                for (let i = 0; i < rows; i++) {
                    board[i] = [];
    
                    for (let j = 0; j < columns; j++) {
                    board[i][j] = cellule.getValue();
                    }
                }

                boxButton.textContent = "";

                rounds = 0;
                winner = "";
            });
            
        boxButton.addEventListener("click", ()=>{
            let i = boxButton.getAttribute("data-row");
            let j = boxButton.getAttribute("data-col");

            if(!boxButton.textContent){
            rounds++;
            playGame.addMark(control.getActivePlayer(), i, j);
            boxButton.textContent = `${board[i][j]}`
           
            game()
            control.switchPlayer();
            turnDiv.textContent = `${control.getActivePlayer().name} turn's`
      
            }
           
        })
        }
      )});
     
     }
    const namePlayers = function(){
        const playBtn = document.querySelector("#play");
        const inputOne = document.querySelector("#player1");
        const inputTwo = document.querySelector("#player2");

        const outputOne = document.querySelector(".showPlayer1");
        const outputTwo = document.querySelector(".showPlayer2");



        playBtn.addEventListener("click", ()=>{
            if(inputOne.value ){
                player1.name = inputOne.value;
                }
            if(inputTwo.value){
                player2.name = inputTwo.value;
                }
            outputOne.textContent = `${player1.name} <${player1.mark}>  `
            outputTwo.textContent = `${player2.name} <${player2.mark}>  `
        
        });
    }
    
    const playAgain = function(){
        const dialog = document.querySelector("dialog.end");
        const endBtn = document.querySelector("button#end");
        const win = document.querySelector(".winner");
  
        dialog.showModal();
        
        win.textContent = winner;

        endBtn.addEventListener("click", ()=>{
            dialog.close();
            boardDiv.textContent = "";
            let board = playGame.getBoard()

            const columns = 3;
                const rows = 3;
                
                const cellule = cell();
    
                for (let i = 0; i < rows; i++) {
                    board[i] = [];
    
                    for (let j = 0; j < columns; j++) {
                    board[i][j] = cellule.getValue();
                    }
                }
            rounds = 0;
            winner = "";
            updateScreen();
        })


    }
    let rounds = 0;
      const game = function(){ 
        
        let mat = playGame.getBoard();
     
        if(mat.some((row)=>row.every((box) => box ==  `${control.getActivePlayer().mark}`))){
           winner = `${control.getActivePlayer().name} WINS!!`;
            playAgain();
          
          }
          else if(mat.every((row)=> row[0] ==  `${control.getActivePlayer().mark}` )||
                  mat.every((row)=> row[1] ==  `${control.getActivePlayer().mark}` )||
                  mat.every((row)=> row[2] ==  `${control.getActivePlayer().mark}`)
                  ){
           winner = `${control.getActivePlayer().name} WINS!!`;
           playAgain();
  
          }
  
          else if(mat[0][0] == `${control.getActivePlayer().mark}` &&
                  mat[1][1] == `${control.getActivePlayer().mark}` &&
                  mat[2][2] == `${control.getActivePlayer().mark}`){
          
            winner = `${control.getActivePlayer().name} WINS!!`;
            playAgain();
            
              }
          else if(mat[0][2] == `${control.getActivePlayer().mark}` &&
          mat[1][1] == `${control.getActivePlayer().mark}` &&
          mat[2][0] == `${control.getActivePlayer().mark}`){
            
              winner = `${control.getActivePlayer().name} WINS!!`;
              playAgain();
              
          }
         
   
          if (rounds == 9 && winner == "") {
           
              winner = `it's a Tie!!`;
              playAgain();

          }
        
      }
      
   /*function clickHandler(e){
        const clicked = e;
        if(!clicked)
            return;
        
        game();

    }
     boardDiv.addEventListener("click", clickHandler);
    */
    namePlayers();
    updateScreen()
  
}
screenController();