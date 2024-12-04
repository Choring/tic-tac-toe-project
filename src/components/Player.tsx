import { useState } from "react";

interface PlayerProps {
    initialName: string;
    symbol: "X" | "O";
    isActive: boolean;
    onChangeName: (symbol:  "X" | "O", newName: string) => void;
}

export const Player= ({initialName, symbol, isActive, onChangeName}: PlayerProps) => {
    const [playerName, setPlayerName] = useState<string>(initialName);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const handleEditClick = () => {
        setIsEditing((editing) => !editing);

        if(isEditing) {
            onChangeName(symbol, playerName);
        }
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
