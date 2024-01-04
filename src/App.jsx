import React from 'react';
import './App.css';
import WordGrid from './components/WordGrid/WordGrid';
import WordList from './components/WordList/WordList';
import { generate } from 'random-words';

function App() {
  const WORDS = generate({
    exactly: 8,
    maxLength: 10,
    formatter: (word) => word.toUpperCase(), 
  });
  console.log(WORDS)
  // const WORDS = ["EXAMPLE", "TEST", "GRID", "SEARCH", "WORD", "PUZZLE", "DEVELOPER", "REACT"];
  return (
    <>
      <div>
        <h1>Word Search Game</h1>
        <WordGrid words={WORDS}/>
        <WordList />
      </div>
    </>
  )
}

export default App;