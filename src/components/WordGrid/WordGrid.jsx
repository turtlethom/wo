import React, { useEffect, useState, useRef } from "react";
import './WordGrid.css';

const WordGrid = ({ words }) => {
  // Grid Size Control
  const GRID_LENGTH = 14
  const WORDS = words;
  // console.log(WORDS)
  
  const [ grid, setGrid ] = useState(Array.from({ length: GRID_LENGTH }, () => Array.from({ length: GRID_LENGTH }, () => '')));
  const [ wordPlacementMap, setWordPlacementMap ] = useState(new Map());
  
  const [ startCoordinate, setStartCoordinate ] = useState(null);
  const [ endCoordinate, setEndCoordinate ] = useState(null);

  const [ selections, setSelections ] = useState([]);
  const [ wordColors, setWordColors ] = useState({});
  const [ usedColors, setUsedColors ] = useState(new Set());

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    do {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (usedColors.has(color))

    setUsedColors(new Set(usedColors).add(color))

    return color;
  }

  useEffect(() => {
    const colors = {};
    words.forEach((word) => {
      colors[word] = getRandomColor();
    });
    setWordColors(colors);
  }, [words]);

  useEffect(() => {
    handleScrambleGrid()
  }, [])

  // Selection Functionality

  const handleMouseDown = (rowIndex, columnIndex) => {
    setStartCoordinate({ x: columnIndex, y: rowIndex });
    setEndCoordinate({ x: columnIndex, y: rowIndex });
  }

  const handleMouseOver = (rowIndex, columnIndex) => {
    if (startCoordinate) {
      setEndCoordinate({ x: columnIndex, y: rowIndex });
    }
  }

  const handleMouseUp = () => {
    if (startCoordinate && endCoordinate) {
      const { cells, word } = getSelectedCells(startCoordinate, endCoordinate);
      const joinedWord = word.join('');
  
      if (joinedWord && WORDS.includes(joinedWord)) {
        const color = getRandomColor();
        setSelections([...selections, { cells, word: joinedWord, color }]);
        setWordColors(prevColors => ({
          ...prevColors,
          [joinedWord]: color
        }));
  
        const remainingWords = WORDS.filter(w => w !== joinedWord);
  
        if (remainingWords.length === 0) {
          // Something happens, e.g., show a restart pop-up
        }
      } else {
        console.log(`${joinedWord} is not one of the valid words`);
      }
    }
  
    setStartCoordinate(null);
    setEndCoordinate(null);
  };
  

  const getSelectedCells = (startCoord, endCoord) => {
    // Bresenham's line algorithm
    const selectedCells = [];
    let x = startCoord.x;
    let y = startCoord.y;
    const dx = Math.abs(endCoord.x - startCoord.x);
    const dy = Math.abs(endCoord.y - startCoord.y);
    const sx = startCoord.x < endCoord.x ? 1 : -1;
    const sy = startCoord.y < endCoord.y ? 1 : -1;
    let err = dx - dy;

    while (true) {
      selectedCells.push({ x, y })

      if (x === endCoord.x && y === endCoord.y) {
        break;
      }

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
    const selectedWord = selectedCells.map(cell => grid[cell.y][cell.x]);
    return { cells: selectedCells, word: selectedWord }
  };

  // const getWordFromCells = (selectedCells) => {
  //   const word = selectedCells.map(cell => grid[cell.y][cell.x]).join('');
  //   return word;
  // };

  const handleScrambleGrid = () => {
    // const initialGrid = Array.from({ length: GRID_LENGTH }, () => Array.from({ length: GRID_LENGTH }, () => ''));
    // setGrid(initialGrid);
    updateWordGrid();
  }

  const placeWord = (grid, word, row, col, direction) => {
    const newGrid = grid.map(row => row.map(cell => cell));

    for (let i = 0; i < word.length; i++) {
      const currentRow = row + (direction === 'vertical' ? i : direction.startsWith('diagonal') ? i : 0);
      const currentCol = col + (direction === 'horizontal' ? i : direction === 'diagonal-up' ? i : -i);

      if (
        currentRow < 0 ||
        currentRow >= grid.length ||
        currentCol < 0 ||
        currentCol >= grid[0].length
      ) {
        return null; // Invalid placement, abort and retry
      }

      // Check if cell is already occupied by a different character
      if (newGrid[currentRow][currentCol] !== '') {
        if (newGrid[currentRow][currentCol] !== word[i]) {
          return null; // Invalid placement, abort and retry
        } else {
          continue;
        }
      }

      newGrid[currentRow][currentCol] = word[i];
    }

    return newGrid;
  };

  const updateWordGrid = () => {
    let newGrid = Array.from({ length: GRID_LENGTH }, () => Array.from({ length: GRID_LENGTH }, () => ''));
    const newWordPlacementMap = new Map();
    // Sorting Words By Length In DESC Order
    const sortedWords = WORDS.sort((a, b) => b.length - a.length);

    sortedWords.forEach(word => {
      let placed = false;
      let attempts = 0;

      const directionOrder = (word.length > 8 
      ? ['horizontal', 'vertical', 'diagonal-up', 'diagonal-down']
      : ['horizontal', 'vertical', 'diagonal-up', 'diagonal-down', 'horizontal-reverse', 'vertical-reverse']);

      // `attempts` Introduced To Prevent Infinite Looping
      while (!placed && attempts < 100) {
        // Attempting To Place Words Within Grid
        const directionIndex = Math.floor(Math.random() * directionOrder.length);
        const direction = directionOrder[directionIndex];
  
        const wordLength = word.length;
  
        let row, col;
  
        if (direction.startsWith('horizontal')) {
          row = Math.floor(Math.random() * GRID_LENGTH);
          col = Math.floor(Math.random() * (GRID_LENGTH - wordLength + 1));
        } else if (direction.startsWith('vertical')) {
          row = Math.floor(Math.random() * (GRID_LENGTH - wordLength + 1));
          col = Math.floor(Math.random() * GRID_LENGTH);
        } else {
          row = Math.floor(Math.random() * (GRID_LENGTH - wordLength + 1));
          col = Math.floor(Math.random() * (GRID_LENGTH - wordLength + 1));
        }
  
        const newGridAttempt = placeWord(newGrid, word, row, col, direction);
        if (newGridAttempt !== null) {
          placed = true;
          newGrid = newGridAttempt;
          newWordPlacementMap.set(word, 'YES');
        }
        attempts++;
      }
    });

    fillEmptySpaces(newGrid);
    setGrid(newGrid);
    setWordPlacementMap(newWordPlacementMap)
  };

  const fillEmptySpaces = (grid) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = getRandomLetter();
        }
      }
    }
  };

  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  // ... (previous code)

  return (
    <>
      <h2>Word Search</h2>
      <button onClick={handleScrambleGrid}>Randomize Grid</button>
      <table className="word-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => {
                const cellCoord = { x: columnIndex, y: rowIndex };
                const selectedInfo = selections.find(
                  (selection) =>
                    selection.cells.some(
                      (selectedCell) =>
                        selectedCell.x === cellCoord.x &&
                        selectedCell.y === cellCoord.y
                    )
                ) || {};
                const isSelected =
                  selectedInfo.word &&
                  selections.some(
                    (selection) =>
                      selection.cells.some(
                        (selectedCell) =>
                          selectedCell.x === cellCoord.x &&
                          selectedCell.y === cellCoord.y &&
                          selection.word === selectedInfo.word
                      )
                  );

                return (
                  <td
                    key={columnIndex}
                    onMouseDown={() => handleMouseDown(rowIndex, columnIndex)}
                    onMouseOver={() => handleMouseOver(rowIndex, columnIndex)}
                    onMouseUp={handleMouseUp}
                    className={isSelected ? `selected ${selectedInfo.word}` : ''}
                    style={{ backgroundColor: isSelected ? selectedInfo.color : '' }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Word Placement Map</h3>
        <ul>
          {WORDS.map((word) => (
            <li key={word}>
              {word}: {wordPlacementMap.get(word) || 'NO'}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

};

export default WordGrid;
