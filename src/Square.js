import React from 'react';

const Square = ({ value, onClick, isWinning }) => {
    return (
        <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onClick}>
            <span className={`value ${isWinning ? 'pulse' : ''}`}>{value}</span>
        </button>
    );
};

export default Square;
