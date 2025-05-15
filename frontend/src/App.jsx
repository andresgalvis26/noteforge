import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewNote from './pages/NewNote.jsx'
import EditNote from './pages/EditNote.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/note/new' element={<NewNote />} />
        <Route path='/note/:id/edit' element={<EditNote />} />
      </Routes>
    </Router>
  )
}

export default App
