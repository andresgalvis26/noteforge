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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className='flex-1 flex justify-center items-center bg-yellow-200'>
          <div className="bg-green-400 w-full flex justify-center max-w-7xl mx-auto p-2">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/dashboard' element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
              <Route path='/note/new' element={<PrivateRoute><NewNote /></PrivateRoute>} />
              <Route path='/note/:id/edit' element={<PrivateRoute><EditNote /></PrivateRoute>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
