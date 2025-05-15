import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewNote from './pages/NewNote.jsx'
import EditNote from './pages/EditNote.jsx'
import Navbar from './components/Navbar.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
        <Route path='/note/new' element={<PrivateRoute><NewNote /></PrivateRoute>} />
        <Route path='/note/:id/edit' element={<PrivateRoute><EditNote /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App
