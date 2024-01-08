import React from "react";
import './Cell.css'

const Cell = ({ cellCoord, isSelected, selectedInfo, letter, handleMouseDown, handleMouseOver, handleMouseUp }) => (
    <td
    onMouseDown={() => handleMouseDown(cellCoord.y, cellCoord.x)}
    onMouseOver={() => handleMouseOver(cellCoord.y, cellCoord.x)}
    onMouseUp={handleMouseUp}
    className={ isSelected ? `selected ${selectedInfo.word}` : '' }
    style={{ backgroundColor: isSelected ? selectedInfo.color : '' }}
    >
        {letter}
    </td>
)

export default Cell;