import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Inspections from './pages/Inspections'
import Standards from './pages/Standards'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
