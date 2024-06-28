import React, { useEffect, useState } from 'react';
import './Board.css';
import Tile from '../Tile/Tile';
import { TileType, initializeGameBoard, moveTiles } from '../../gameLogic';

interface BoardProps {
}

const Board: React.FC<BoardProps> = () => {
  const [gameBoard, setGameBoard] = useState<TileType[][]>(initializeGameBoard())

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    let newBoard : TileType[][] = [];
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
    console.log("gameBoard: " , gameBoard);
    console.log("newBoard: " , newBoard);
    
    setGameBoard(newBoard);
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
},[gameBoard]);

  return (
    <div className='Board'>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((tile) => (
            // <Tile position = {{x:tile.position.x,y:tile.position.y}} value= {tile.value}/>
            <Tile value= {tile.value}/>
          ))}
        </div>
      ))}
      </div>
  );
};

export default Board;
