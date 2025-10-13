import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


function App() {


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
