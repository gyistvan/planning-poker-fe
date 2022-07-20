import './App.css'
import React from 'react'
import Header from './components/header/Header'
import axios from 'axios'
import RoomRoot from './components/room/RoomRoot'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JoinRoom } from './components/JoinRoom/JoinRoom'

const env = process.env.NODE_ENV

axios.defaults.baseURL = env === 'production' ? 'https://planning-poker-vyno-be.herokuapp.com/' : 'http://127.0.0.1:4000/'

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<RoomRoot />} />
        <Route path="joinRoom">
          <Route path=":roomName" element={<JoinRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
