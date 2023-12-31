import React from 'react';
import './App.css';
import WordGrid from './components/WordGrid/WordGrid';
import WordList from './components/WordList/WordList';

function App() {
  return (
    <>
      <div>
        <h1>Word Search Game</h1>
        <WordGrid />
        <WordList />
      </div>
    </>
  )
}

export default App;