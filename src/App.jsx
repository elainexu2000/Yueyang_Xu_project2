import {
  Route,
  Routes
} from "react-router-dom";
import React from 'react';
import Home from './Home';
import Simulation from './Simulation';
import Credits from './Credits';
import Navigation from './Navigation';

export default function App() {
  return (
    <>
      <Navigation/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/simulation" element={<Simulation/>}/>
          <Route path="/credits" element={<Credits/>}/>
        </Routes>
      </div>
    </>
  );
}