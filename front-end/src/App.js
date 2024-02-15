import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css';
import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import AddConference from './components/AddConference';
import Conferences from './components/Conferences';
import GetAllConferences from './components/GetAllConferences';



const access_token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/AddConference" element={<AddConference />} />
          <Route path="/Conferences" element={<Conferences />} />
          <Route path="/GetAllConferences" element={<GetAllConferences />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;