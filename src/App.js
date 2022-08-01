import './App.css'
import React from 'react'
import Header from './components/header/header.component'
import axios from 'axios'
import RoomRoot from './components/room/room-root.component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JoinRoom } from './components/join-room/join-room.component'
import { AppAlert } from './components/app-alert/app-alert.component'

const env = process.env.NODE_ENV

axios.defaults.baseURL =
  env === 'production'
    ? 'https://planning-poker-vyno-be.herokuapp.com/'
    : 'http://127.0.0.1:4000/'

function App() {
  return (
    <BrowserRouter>
      <AppAlert />
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
