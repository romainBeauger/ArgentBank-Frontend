import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';


function App() {


  return (

    <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
