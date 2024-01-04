import React, { useEffect, useState, useRef } from "react";
import './WordGrid.css';

const WordGrid = ({ words }) => {
  // Grid Size Control
  const GRID_LENGTH = 14
  const WORDS = words;
  // console.log(WORDS)
  
  const [ grid, setGrid ] = useState(Array.from({ length: GRID_LENGTH }, () => Array.from({ length: GRID_LENGTH }, () => '')));
  const [ wordPlacementMap, setWordPlacementMap ] = useState(new Map());

  useEffect(() => {
    const initialGrid = Array.from({ length: GRID_LENGTH }, () => Array.from({ length: GRID_LENGTH }, () => ''));
    setGrid(initialGrid);
    updateWordGrid();
  }, [words]);

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

  return (
    <>
      <h2>Word Search</h2>
      <table className="word-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Word Placement Map</h3>
        <ul>
          {WORDS.map((word) => (
            <li key={word}>
              {word}: {wordPlacementMap.get(word) || "NO"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WordGrid;
