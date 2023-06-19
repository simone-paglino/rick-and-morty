import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import CharactersList from './character/CharactersList'

const RouterApp: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />}>
        {/*<Route path="*" element={<NoMatch />} />*/}
      </Route>
    </Routes>
  )
}

export default RouterApp
