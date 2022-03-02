import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavNoAuth from './NavNoAuth'
import NavAuth from './NavAuth'
import HomeAuth from './HomeAuth'
import HomeNoAuth from './HomeNoAuth'
import CompletedGoals from './CompletedGoals'
import MyGoals from './MyGoals'
// import Footer from './Footer'

import Divider from '@mui/material/Divider'

function App () {
  return (
    <>
      <NavAuth />
      <NavNoAuth />

      <Divider sx={{ background: '#2C3333', mt: 3.5 }} variant="middle" />

      <HomeNoAuth />

      <Routes>
        <Route path='/' element={<HomeAuth />} />
        <Route path='/mygoals' element={<MyGoals />} />
        <Route path='/completed' element={<CompletedGoals />} />
      </Routes>

      {/* <Footer /> */}

    </>
  )
}

export default App
