import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Details from './pages/Details'
import About from './pages/About'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/palette/:id" element={<Details />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </>
  )
}

export default App
