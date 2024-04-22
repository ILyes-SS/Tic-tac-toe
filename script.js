const cell = function(){
    let value = "-";

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

    const addMark = function(player){
        let row ;
        let col ;
        do{
         row = prompt("enter the row");
         col = prompt("enter the column");
        if(board[row][col] == "-"){
            board[row][col] = cellule.newValue(player);
            break;
        }
        }while(board[row][col] != "-");
       
    }

    const printBoard = function(){
       let j = 0;
        for (let i = 0; i < rows; i++) {
             console.log("\n");
             console.log(`\t${board[i][j]}\t${board[i][j + 1]}\t${board[i][j + 2]}`);   
        }
    }

    return {getBoard , addMark , printBoard}
}

function player(name, mark){
    return {name , mark};
}

const player1 = player("ilyes","X");
const player2 = player("nigga","O");

const gameController = function(){
    const board = gameBoard();

    let activePlayer = player1;

    const getActivePlayer = ()=> activePlayer;

    const switchPlayer = function(){
        return activePlayer = activePlayer === player1 ? player2 : player1
    }

    const playRound = function(){
        switchPlayer();
        console.log(`it is ${activePlayer.name} turn`);     
        board.addMark(activePlayer);
        board.printBoard();
        
    }
    
    const game = function(){
        const mat = board.getBoard();
        let rounds = 0;
        do{
        playRound();
        
        if(mat.some((row)=>row.every((square) => square ==  `${getActivePlayer().mark}`))){
         console.log(`${getActivePlayer().name} WINS!!`);
         break;
        
        }
        else if(mat.every((row)=> row[0] ==  `${getActivePlayer().mark}` )||
                mat.every((row)=> row[1] ==  `${getActivePlayer().mark}` )||
                mat.every((row)=> row[2] ==  `${getActivePlayer().mark}`)
                ){
          console.log(`${getActivePlayer().name} WINS!!`);
          break;

        }

        else if(mat[0][0] == `${getActivePlayer().mark}` &&
                mat[1][1] == `${getActivePlayer().mark}` &&
                mat[2][2] == `${getActivePlayer().mark}`){
          console.log(`${getActivePlayer().name} WINS!!`);
          break;
            }
        else if(mat[0][2] == `${getActivePlayer().mark}` &&
        mat[1][1] == `${getActivePlayer().mark}` &&
        mat[2][0] == `${getActivePlayer().mark}`){
            console.log(`${getActivePlayer().name} WINS!!`);
            break;
        }
        rounds++;
        }while(rounds < 9);
        if (rounds == 9) {
            console.log(`it's a Tie!!`);
        }
    }
    game();
  
    return {getActivePlayer}
}
gameController();
