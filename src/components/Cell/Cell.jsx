import React, { useEffect, useState } from "react";
import getRandomColor from "../../utils/colorUtils";
import './Cell.css'

const Cell = ({ cellCoord, isSelected, isTrackedSelection, selectedInfo, letter, handleMouseDown, handleMouseOver, handleMouseUp }) => {
    const { x, y } = cellCoord;
    const { word, color } = selectedInfo;
    
    const [cellColor, setCellColor ] = useState(color);
    const [trackedColor, setTrackedColor ] = useState('#a0a0a0');
    const [hasAssignedTrackedColor, setHasAssignedTrackedColor] = useState(false);
    // Update usedColors & Make Unavailable For Future User Selections.
    useEffect(() => {
        setCellColor(color);
    }, [color])

    useEffect(() => {
        if (isTrackedSelection && !hasAssignedTrackedColor) {
            const newTrackedColor = getRandomColor(new Set([cellColor, trackedColor]))
            setTrackedColor(newTrackedColor);
            setHasAssignedTrackedColor(true); // Assign a random color for tracked selections
        } else if (!isTrackedSelection) {
            setTrackedColor('#a0a0a0'); // Reset to default when tracking is over
            setHasAssignedTrackedColor(false);
        }
    }, [isTrackedSelection, cellColor, trackedColor, hasAssignedTrackedColor]);
    
    const backgroundColor = isTrackedSelection ? trackedColor : isSelected ? cellColor : '';
    return (
        <td
        className={ isSelected ? `selected ${word}` : '' }
        onMouseDown={() => handleMouseDown(y, x)}
        onMouseOver={() => handleMouseOver(y, x)}
        onMouseUp={handleMouseUp}
        style={{ backgroundColor: backgroundColor }}
        >
            {letter}
        </td>
    )
}

export default Cell;