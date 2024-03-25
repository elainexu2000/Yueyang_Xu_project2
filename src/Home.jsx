import React from 'react';

function Home() {
  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <h2>Introduction</h2>
      <p>Conway's Game of Life is a game that is “played” based on a grid system. 
        Every individual location on the grid can be understood as a cell. 
        The game, or simulation, occurs over iterations, or generations.  
        After a generation, a cell may change from living or dead based on how many living or dead neighbors it had in a previous iteration.  
        A neighbor is any immediately adjacent spot on the grid (horizontal, vertical or diagonal).  
        </p>
      <h2>Fundamental Rules</h2>
      <ul>
        <li>A living cell with less than two living neighbours dies.</li>
        <li>A living cell with two or three live neighbours lives.</li>
        <li>A living cell with more than three live neighbours dies.</li>
        <li>A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ul>
    </div>
  );
};

export default Home;