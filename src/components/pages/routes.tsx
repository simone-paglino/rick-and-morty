import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import CharactersList from './character/CharactersList'

const RouterApp: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" index element={<CharactersList />} />
        <Route path="/character/:id" element={<div>Single page</div>} />
        {/*<Route path="*" element={<NoMatch />} />*/}
      </Route>
    </Routes>
  )
}

export default RouterApp
