import React, { useEffect, useState } from "react";
import './WordGrid.css';

const WordGrid = () => {
  const WORDS = ["EXAMPLE", "TEST", "GRID", "SEARCH", "WORD", "PUZZLE", "DEVELOPER", "REACT"];
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => '')));

  useEffect(() => {
    const initialGrid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));
    setGrid(initialGrid);
    updateWordGrid();
  }, []);

  const placeWord = (grid, word, row, col, direction) => {
    const newGrid = grid.map(row => row.map(cell => cell));

    for (let i = 0; i < word.length; i++) {
      const currentRow = row + (direction === 'vertical' ? i : 0);
      const currentCol = col + (direction === 'horizontal' ? i : 0);

      if (
        currentRow < 0 ||
        currentRow >= grid.length ||
        currentCol < 0 ||
        currentCol >= grid[0].length ||
        newGrid[currentRow][currentCol] !== ''
      ) {
        return null; // Invalid placement, abort and retry
      }

      newGrid[currentRow][currentCol] = word[i];
    }

    return newGrid;
  };

  const updateWordGrid = () => {
    let newGrid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));

    WORDS.forEach(word => {
      let placed = false;
      while (!placed) {
        const directionIndex = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        let direction;

        if (directionIndex === 0) {
          direction = 'horizontal';
        } else if (directionIndex === 1) {
          direction = 'vertical';
        } else {
          direction = Math.random() < 0.5 ? 'diagonal-up' : 'diagonal-down';
        }

        const wordLength = word.length;

        let row, col;

        if (direction === 'horizontal') {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * (10 - wordLength + 1));
        } else if (direction === 'vertical') {
          row = Math.floor(Math.random() * (10 - wordLength + 1));
          col = Math.floor(Math.random() * 10);
        } else {
          row = Math.floor(Math.random() * (10 - wordLength + 1));
          col = Math.floor(Math.random() * (10 - wordLength + 1));
        }

        const newGridAttempt = placeWord(newGrid, word, row, col, direction);
        if (newGridAttempt !== null) {
          placed = true;
          newGrid = newGridAttempt;
        }
      }
    });

    fillEmptySpaces(newGrid);
    setGrid(newGrid);
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
    </>
  );
};

export default WordGrid;
