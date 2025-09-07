import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorite'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
   const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <MovieProvider>
       {!hideNav && <NavBar />} 
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/favorites'
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </MovieProvider>
  )
}
export default App
