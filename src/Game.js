import React, { useState, useRef } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const boardRef = useRef(null);

    const handleTwoPlayersClick = () => {
        setSelectedMode('twoPlayers');
        setIsGameCompleted(false);
        if (boardRef.current) {
            boardRef.current.initialize();
        }
    };

    const handleComputerClick = () => {
        setSelectedMode('computer');
        setIsGameCompleted(false);
        if (boardRef.current) {
            boardRef.current.initialize();
        }
    };

    const handleGameCompletion = () => {
        setIsGameCompleted(true);
        setSelectedMode(null);
    };

    return (
        <div className="game">
            <div className={`game-buttons ${isGameCompleted || !selectedMode ? '' : 'hidden'}`}>
                <button onClick={handleTwoPlayersClick}>2 Players</button>
                <button onClick={handleComputerClick}>Play with Computer</button>
            </div>
            {(selectedMode || isGameCompleted) && (
                <div className="game-board">
                    <Board
                        ref={boardRef}
                        isComputerPlaying={selectedMode === 'computer'}
                        onGameCompletion={handleGameCompletion}
                    />
                </div>
            )}
        </div>
    );
};

export default Game;
