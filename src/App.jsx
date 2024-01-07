import React, { useState } from 'react';
import './App.css';
import WordGrid from './components/WordGrid/WordGrid';
import WordList from './components/WordList/WordList';
import { generate } from 'random-words';

function App() {

  const [ words, setWords ] = useState(generateWords());

  function generateWords() {
    return generate({
      exactly: 8,
      maxLength: 10,
      formatter: (word) => word.toUpperCase(), 
    });
  }
  console.log(words)
  // const words = ["EXAMPLE", "TEST", "GRID", "SEARCH", "WORD", "PUZZLE", "DEVELOPER", "REACT"];
  const handleGenerateClick = () => {
    setWords(generateWords());
  }
  return (
    <>
      <div>
        <h1>Word Search Game</h1>
        <button onClick={handleGenerateClick}>Set Word List</button>
        <WordGrid words={words}/>
        <WordList />
      </div>
    </>
  )
}

export default App;