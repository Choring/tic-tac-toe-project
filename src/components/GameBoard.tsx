

type GameBoard = (null | "X" | "O")[][];
interface GameBoardProps {
    board: GameBoard;
    onSelectSquare: (rowIndex: number, colIndex: number) => void;
}


export const GameBoard= ({ onSelectSquare, board }: GameBoardProps) => {

    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => 
                <li key={colIndex}>
                    <button 
                        onClick={() => onSelectSquare(rowIndex, colIndex)} 
                        disabled={playerSymbol !== null ? true : false}
                    >
                        {playerSymbol}
                    </button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}