import React from 'react';
import './Tile.css';

interface TileProps {
  // position: { x: number, y: number };
  value: number;
}

// const Tile: React.FC<TileProps> = ({ value, position }) => {
  const Tile: React.FC<TileProps> = ({ value }) => {

  const tileClass = `tile tile${value}`;
  return (
    <div className={tileClass}>
      {value > 0 ? value : ''}
    </div>
  );
};

export default Tile;
