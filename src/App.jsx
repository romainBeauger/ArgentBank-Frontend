import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setUser } from './store/authSlice';
import { getUserProfile } from './services/api';
import Header from '../src/components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


function App() {

  const dispatch = useDispatch()

  // Au chargement vérifie si un token existe dans localStorage
      useEffect(() => {
          const savedToken = localStorage.getItem('token')
  
          if (savedToken) {
            // Si un token existe, récupère le profil
              getUserProfile(savedToken)
                  .then((userData) => {
                    // Reconnecte l'utilisateur
                      dispatch(loginSuccess({ token: savedToken }))
                      dispatch(setUser(userData))
                  })
                  .catch((error) => {
                      // Token invalide ou expiré, on le supprime
                      console.error('Token invalide:', error);
                      localStorage.removeItem('token');
                  })
          }
      }, [dispatch])


  return (

    <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protège la route Profile avec le composant PrivateRoute*/}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
