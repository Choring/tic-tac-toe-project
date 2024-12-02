import { useState } from "react";

interface PlayerProps {
    initialName: string;
    symbol: "X" | "O";
    isActive: boolean;
}

export const Player: React.FC<PlayerProps> = ({initialName, symbol, isActive}) => {
    const [playerName, setPlayerName] = useState<string>(initialName);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const handleEditClick = () => {
        setIsEditing((editing) => !editing);   
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value);
    }

    let editablePlayerName: JSX.Element = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? "active" : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
