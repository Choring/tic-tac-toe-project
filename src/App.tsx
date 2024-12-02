import { useState } from "react";
import {GameBoard} from "./components/GameBoard";
import {Player} from "./components/Player";
import { Log } from "./components/Log";

interface Turn {
  square: { row: number; col: number };
  player: "X" | "O";
}


function deriveActivePlayer(gmaeTurns: Turn[]): "X" | "O"  {
  let currentPlayer: "X" | "O" = "X";

      if(gmaeTurns.length > 0 && gmaeTurns[0].player === "X") {
        currentPlayer = "O";
      } 

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState<Turn[]>([]);
  // const [activePlayer, setActivePlayer] = useState<"X" | "O">("X");

  const activePlayer = deriveActivePlayer(gameTurn);

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
      <GameBoard onSelectSquare={handleSelectSquare} turns = {gameTurn} />
    </div>
    <Log turns={gameTurn} />
  </main>;
}

export default App
