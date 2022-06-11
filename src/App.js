import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Register from './Register/Register';
import Movies from './Movies/Movies';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import Details from './Details/Details';
import Tv from './Tv/Tv';
import About from './About/About';
import { MediaContextProvider } from './MediaContext';

function App() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate();
  function getUserData() {
    const decodedData = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedData);
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData();
    }
  }, [])

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')

  }
  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to='/login' />;
    } else {
      return children;
    }
  }
  return (
    <div>
      <Navbar userData={userData} logOut={logOut} />
      <div className='container pt-5'>
        <MediaContextProvider>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
            <Route path='Tv' element={<ProtectedRoute><Tv /></ProtectedRoute>} />
            <Route path='about' element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path='details' element={<ProtectedRoute><Details /></ProtectedRoute>} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login getUserData={getUserData} />} />
            <Route path='*' element={<h2>404</h2>} />
          </Routes>
        </MediaContextProvider>
      </div>

    </div>
  );
}

export default App;
