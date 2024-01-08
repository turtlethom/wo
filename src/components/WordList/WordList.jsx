import React from "react";
import './WordList.css';

const WordList = ({ words, wordsFound }) => {
    return (
        <div className="word-list-container">
            <ul>
                {words.map((word) => (
                    <li key={ word }>
                        <span className={ wordsFound.get(word) ? 'strikethrough' : "" }> {word}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordList;