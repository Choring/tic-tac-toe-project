import { useState } from "react";

type Player = {
    initialName: string;
    symbol: string;
}

export default function Player({initialName, symbol}: Player) {
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
        <li>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
