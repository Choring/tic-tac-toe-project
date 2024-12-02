type Winner = {
    winner: string | null;
    onRestart: () => void;
}

export const GameOver = ({winner, onRestart} : Winner) => {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner}님이 이겼습니다.!</p>}
        {!winner && <p> 무승부!</p>}
        <p>
            <button onClick={onRestart}>재시작!</button>
        </p>
    </div>
}