interface Turn {
    square: { row: number; col: number };
    player: "X" | "O";
}

interface LogProps {
    turns: Turn[];
}

export const Log = ({ turns }: LogProps) => {
    
    return <ol id="log">
        {turns.map(turn => (
            <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row},{turn.square.col}
            </li>
        ))}
    </ol>
}