import { useState } from "react";
import {GameBoard} from "./components/GameBoard";
import {Player} from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import { GameOver } from "./components/GameOver";
interface Turn {
  square: { row: number; col: number };
  player: "X" | "O";
}
type GameBoard = (null | "X" | "O")[][];

const initialGameBoard: GameBoard= [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gmaeTurns: Turn[]): "X" | "O"  {
  let currentPlayer: "X" | "O" = "X";

      if(gmaeTurns.length > 0 && gmaeTurns[0].player === "X") {
        currentPlayer = "O";
      } 

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState<Turn[]>([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState<"X" | "O">("X");

  const activePlayer = deriveActivePlayer(gameTurn);

  

  const gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurn ) {
      const { square, player } = turn;
      const { row, col } = square;
      
      gameBoard[row][col] = player;
  }

  let winner;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  };

  const hasDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex : number, colIndex: number): void => {
    setGameTurn((prevTurns: Turn[]): Turn[] => {
      const currentPlayer= deriveActivePlayer(prevTurns);
  
      const updatedTurns: Turn[] = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  // const handleSelectSquare = (rowIndex: number, colIndex: number): void => {
  //   setGameTurn((prevTurns) => [
  //     { square: { row: rowIndex, col: colIndex }, player: activePlayer },
  //     ...prevTurns,
  //   ]);

  //   setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  // };

  function handleRestart() {
    setGameTurn([]);
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          initialName="Player 1" 
          symbol="X" 
          isActive= {activePlayer === "X"} 
        />
        <Player 
          initialName="Player 2" 
          symbol="O" 
          isActive= {activePlayer === "O"} 
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner || null} onRestart={handleRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurn} />
  </main>;
}

export default App
