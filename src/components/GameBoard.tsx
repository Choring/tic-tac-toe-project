

type GameBoard = (null | "X" | "O")[][];
interface Turn {
    square: { row: number; col: number };
    player: "X" | "O";
}
interface GameBoardProps {
    turns: Turn[];
    onSelectSquare: (rowIndex: number, colIndex: number) => void;
}

const initialGameBoard: GameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export const GameBoard: React.FC<GameBoardProps> = ({ onSelectSquare, turns }) => {
    const gameBoard = initialGameBoard;

    for (const turn of turns ) {
        const { square, player } = turn;
        const { row, col } = square;
        
        gameBoard[row][col] = player;
    }

    // const [gameBoard, setGameBoard ] = useState<GameBoard>(initialGameBoard);

    // const handleSelectSquare :(rowIndex: number, colIndex: number) => void  = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard: GameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare(rowIndex, colIndex);
    // };

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => 
                <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}