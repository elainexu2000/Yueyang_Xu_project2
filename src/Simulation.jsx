import React, { useState, useEffect } from 'react';
import './App.css'; 

const Simulation = () => {
  const [grid, setGrid] = useState([]);
  const [isHeatmap, setIsHeatmap] = useState(false);
  const [livingCellsCount, setLivingCellsCount] = useState(0);
  const [height, setHeight] = useState(20);
  const [width, setWidth] = useState(20);
  const [validInput, setValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    initializeGrid(height, width);
  }, []);

  const GridCell = ({ value, onClick }) => {
    const cellStyle = {
      width: '30px',
      height: '30px',
      border: '1px solid grey',
      backgroundColor: value ? 'white' : 'black',
    };
  
    return <div style={cellStyle} onClick={onClick}></div>;
  };

  const initializeGrid = (h, w) => {
    if (isNaN(h) || isNaN(w) || h < 3 || h > 40 || w < 3 || w > 40) {
      setErrorMessage('Please enter valid numbers between 3 and 40.');
      return;
    }
    setErrorMessage('');
    const aliveRatio = 0.05;
    const updatedGrid = [];
    for (let i = 0; i < h; i++) {
      const row = [];
      for (let j = 0; j < w; j++) {
        let isAlive = Math.random() < aliveRatio;
        row.push(isAlive);
      }
      updatedGrid.push(row);
    }
    setGrid(updatedGrid);
    updateLivingCellsCount(updatedGrid);
  };

  const renderGrid = () => {
    return (
      <div className='board'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />           
              ))
            }
          </div>))
        }
      </div>
    );
  };
  const handleCellClick = (rowIndex, colIndex) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = !updatedGrid[rowIndex][colIndex];
    setGrid(updatedGrid);
    updateLivingCellsCount(updatedGrid);
  };

  const updateLivingCellsCount = (updatedGrid) => {
    let count = 0;
    for(let i = 0; i < updatedGrid.length; i++){
      for(let j = 0; j < updatedGrid[i].length; j++){
        if(updatedGrid[i][j])
          count++;
      }
    }
    setLivingCellsCount(count);
  };

  const renderControls = () => {
    return (
      <div className="controls">
        <button onClick={handleResetGrid}>Reset Grid</button>
        <button onClick={handleNextFrame}>Next Frame</button>
        <button onClick={() => setIsHeatmap(!isHeatmap)}>
          {isHeatmap ? 'Show Regular Colors' : 'Show Heatmap'}
        </button>
      </div>
    );
  };
  const handleResetGrid = () => {
    const defaultHeight = 20;
    const defaultWidth = 20;
    initializeGrid(defaultHeight, defaultWidth);
  };

  const handleNextFrame = () => {
    updateGrid();
  };
  const updateGrid = () => {
    let updatedGrid = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        let aliveNeighbors = 0;
        // Immediate neighbors (up, down, left, right)
        if (j !== 0) {
          if (grid[i][j - 1]) aliveNeighbors++; // left
        }
        if (j !== width - 1) {
          if (grid[i][j + 1]) aliveNeighbors++; // right
        }
        if (i !== 0) {
          if (grid[i - 1][j]) aliveNeighbors++; // up
        }
        if (i !== height - 1) {
          if (grid[i + 1][j]) aliveNeighbors++; // down
        }
        // Diagonal neighbors
        if (i !== 0 && j !== 0) {
          if (grid[i - 1][j - 1]) aliveNeighbors++; // top-left
        }
        if (i !== 0 && j !== width - 1) {
          if (grid[i - 1][j + 1]) aliveNeighbors++; // top-right
        }
        if (i !== height - 1 && j !== 0) {
          if (grid[i + 1][j - 1]) aliveNeighbors++; // bottom-left
        }
        if (i !== height - 1 && j !== width - 1) {
          if (grid[i + 1][j + 1]) aliveNeighbors++; // bottom-right
        }
        if (grid[i][j]) {
          // 1. A living cell with fewer than two live neighbors dies.
          if (aliveNeighbors < 2) {
            row.push(false);
          }
          // 2. A living cell with two or three live neighbors lives on to the next generation.
          else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            row.push(true);
          }
          // 3. A living cell with more than three live neighbors dies (overpopulation).
          else {
            row.push(false);
          }
        } 
        else {
          // 4. A dead cell with exactly three live neighbors becomes a live cell (reproduction).
          if (aliveNeighbors === 3) {
            row.push(true);
          } else {
            row.push(false);
          }
        }
      }
      updatedGrid.push(row);
    }
    setGrid(updatedGrid);
    updateLivingCellsCount(updatedGrid);
  };
  
  const handleHeightChange = (e) => {
    const h = e.target.value;
    if (isNaN(h) || h < 3 || h > 40) {
      setErrorMessage('Please enter a valid integer between 3 and 40.');
      setValidInput(false);
    }
    else{
      setHeight(h);
      setErrorMessage('');
      setValidInput(true);
    }
  };
  const handleWidthChange = (e) => {
    const w = e.target.value;
    if (isNaN(w) || w < 3 || w > 40) {
      setErrorMessage('Please enter a valid integer between 3 and 40.');
      setValidInput(false);
    }
    else{
      setWidth(w);
      setErrorMessage('');
      setValidInput(true);
    }
  };
  const handleSubmit = () => {
    if (validInput) {
      initializeGrid(height, width);
    }
  };

  return (
    <div className="app-container">
      <div className='operations'>
        <div className="input-fields">
          <input
            type="text"
            id="heightInput"
            placeholder='Enter Height'
            onChange={handleHeightChange}
          />
          <input
            type="text"
            id="widthInput"
            placeholder='Enter Width'
            onChange={handleWidthChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className='metrics'>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="living-cells-count">Living Cells: {livingCellsCount}</div>
        </div>
        {renderControls()}
      </div>
      {renderGrid()}
    </div>
  );
};

export default Simulation;

