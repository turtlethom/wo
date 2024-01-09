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

export default placeWord;