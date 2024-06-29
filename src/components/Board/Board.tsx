import React, { useEffect, useState } from 'react';
import './Board.css';
import Tile from '../Tile/Tile';
import { TileType, initializeGameBoard, moveTiles, newNumber, checkGameOver, checkWin } from '../../gameLogic';

interface BoardProps {
}

const Board: React.FC<BoardProps> = () => {
  const [gameBoard, setGameBoard] = useState<TileType[][]>(initializeGameBoard());
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const startNewGame = () => {
    setGameBoard(initializeGameBoard());
    setGameOver(false);
    setWin(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newBoard : TileType[][] = gameBoard;
      if(e.key === 'ArrowUp'){
        newBoard = moveTiles('up', gameBoard);
      }
      if(e.key === 'ArrowDown'){
        newBoard = moveTiles('down', gameBoard);
      }
      if(e.key === 'ArrowLeft'){
        newBoard = moveTiles('left', gameBoard);
      }
      if(e.key === 'ArrowRight'){
        newBoard = moveTiles('right', gameBoard);
      }

      if (newBoard !== gameBoard) {
        newBoard = newNumber(newBoard);
        setGameBoard(newBoard);

        if (checkWin(newBoard)) {
          setWin(true);
        } else if (checkGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameBoard]);

  return (
    <div className='Board'>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((tile, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={tile.value} />
          ))}
        </div>
      ))}
      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h1>Game Over</h1>
            <button onClick={startNewGame}>Start New Game</button>
          </div>
        </div>
      )}
      {win && (
        <div className="game-win-overlay">
          <div className="game-win-content">
            <h1>You Win!</h1>
            <button onClick={startNewGame}>Start New Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
