import React, { useEffect, useState } from "react";
import './Cell.css'

const Cell = ({ cellCoord, isSelected, selectedInfo, letter, handleMouseDown, handleMouseOver, handleMouseUp }) => {
    const { x, y } = cellCoord;
    const { word, color } = selectedInfo;
    
    const [cellColor, setCellColor ] = useState(color);
    // Update usedColors & Make Unavailable For Future User Selections.
    useEffect(() => {
        setCellColor(color);
    }, [color])
    
    return (
        <td
        className={ isSelected ? `selected ${word}` : '' }
        onMouseDown={() => handleMouseDown(y, x)}
        onMouseOver={() => handleMouseOver(y, x)}
        onMouseUp={handleMouseUp}
        style={{ backgroundColor: isSelected ? cellColor : '' }}
        >
            {letter}
        </td>
    )
}

export default Cell;