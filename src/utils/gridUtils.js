export const fillEmptySpaces = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = getRandomLetter();
            }
        }
    }
};

export const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

/* So far I have done:
-- colorUtils
getRandomColor
-- wordUtils
placeWord
-- gridUtils
getRandomLetter
fillEmptySpaces

(File Structure ABOVE)
What else did I miss extracting? And show me the full code files, including the new revised WordGrid 
*/