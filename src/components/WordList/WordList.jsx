import React from "react";
import './WordList.css';

const WordList = () => {
    const WORDS = ["EXAMPLE", "TEST", "GRID", "SEARCH", "WORD", "PUZZLE", "DEVELOPER", "REACT"];
    return (
        <>
            <h2>Word List</h2>
            <ul>
                {WORDS.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </>
    )
}

export default WordList;