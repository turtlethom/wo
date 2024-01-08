import React from "react";
import './WordList.css';

const WordList = ({ words, wordsFound }) => (
    <div>
        <h3>Word Placement Map</h3>
        <ul>
            {words.map((word) => (
                <li
                key={ word }
                className={ wordsFound.get(word) ? 'strikethrough' : "" }
                >
                    {word}
                </li>
            ))}
        </ul>
    </div>
)

export default WordList;