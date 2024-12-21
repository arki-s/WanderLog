import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Index from './components/Index'
import Details from './components/Details'
import Header from './components/Header'


const AppRoutes = () =>{

  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/index" element={<Index/>} />
        <Route path="/details/:id" element={<Details/>} />
      </Routes>
    </BrowserRouter>
  );

}

export default AppRoutes;
