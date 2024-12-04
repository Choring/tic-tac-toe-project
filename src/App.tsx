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
type Players = {
  X: string;
  O: string;
}
interface DeriveWinner {
  gameBoard: GameBoard;
  players: Players
}

const PLAYERS: Players = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD: GameBoard= [
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

function deriveGameBoard(gameTurn: Turn[]) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn ) {
      const { square, player } = turn;
      const { row, col } = square;
      
      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner({gameBoard, players}: DeriveWinner)  {
  let winner;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  };
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState<Turn[]>([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  const gameBoard = deriveGameBoard(gameTurn);

  const winner = deriveWinner({gameBoard, players});

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

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol: "X" | "O", newName: string) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          initialName={PLAYERS.X}
          symbol="X" 
          isActive= {activePlayer === "X"}
          onChangeName = {handlePlayerNameChange} 
        />
        <Player 
          initialName={PLAYERS.O}
          symbol="O" 
          isActive= {activePlayer === "O"} 
          onChangeName = {handlePlayerNameChange} 
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner || null} onRestart={handleRestart}  />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurn} />
  </main>;
}

export default App
