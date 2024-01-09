import React, { useState } from 'react';
import './App.css';
import WordGrid from './components/WordGrid/WordGrid';
import { generate } from 'random-words';

function App() {
  
  
  // Word Search Game Controllers
  const [ gridSize, setGridSize ] = useState(15);
  const [ wordComplexity, setWordComplexity ] = useState({
    exactly: 10,
    minLength: 5,
    maxLength: 10,
    formatter: (word) => word.toUpperCase(),
  });
  
  const generateWords = () => generate(wordComplexity);
  const [ words, setWords ] = useState(generateWords());
  
  
  // function generateWords() {
  //   return generate({
  //     exactly: 10,
  //     maxLength: 10,
  //     formatter: (word) => word.toUpperCase(), 
  //   });
  // }
  // console.log(words)

  const handleGenerateNewWords = () => {
    setWords(generateWords());
  }
  return (
    <>
      <div>
        <h1>Word Search Game</h1>
        <button onClick={handleGenerateNewWords}>Change Words</button>
        <WordGrid words={words} gridSize={gridSize} />
      </div>
    </>
  )
}

export default App;