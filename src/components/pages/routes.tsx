import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import CharactersList from './characters/CharactersList'

const RouterApp: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />}>
        {/*<Route index element={<Home />} />*/}
        {/*<Route path="about" element={<About />} />*/}
        {/*<Route path="dashboard" element={<Dashboard />} />*/}

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        {/*<Route path="*" element={<NoMatch />} />*/}
      </Route>
    </Routes>
  )
}

export default RouterApp
