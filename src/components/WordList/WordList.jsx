import React from "react";
import './WordList.css';

const WordList = () => {
    const words = ['WORD', 'SEARCH', 'PLAY']
    return (
        <>
            <h2>Word List</h2>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </>
    )
}

export default WordList;