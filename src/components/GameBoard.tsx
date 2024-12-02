import { useState } from "react";

type GameBoard = (null | string)[][];
interface GameBoardProps {
    activePlayerSymbol: "X" | "O";
    onSelectSquare: (rowIndex: number, colIndex: number) => void;
}


const initialGameBoard: null[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export const GameBoard: React.FC<GameBoardProps> = ({ onSelectSquare, activePlayerSymbol }) => {
    const [gameBoard, setGameBoard ] = useState<GameBoard>(initialGameBoard);

    const handleSelectSquare :(rowIndex: number, colIndex: number) => void  = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedBoard: GameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        onSelectSquare(rowIndex, colIndex);
    };

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => 
                <li key={colIndex}>
                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}