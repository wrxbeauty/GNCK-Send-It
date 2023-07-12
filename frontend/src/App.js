import React, { useState} from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
       </BrowserRouter>
        
       
    </div>
  );
}

export default App;
