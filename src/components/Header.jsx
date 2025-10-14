import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import logo from '../assets/argentBankLogo.png'

export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Récupère l'état de connexion et les infos utilisateur
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  console.log("user dans header :", user);
  

  // Fonction pour se déconnecter
  const handleLogout = () => {
     // Supprime le token du localStorage
     localStorage.removeItem('token')     
    dispatch(logout())
    navigate('/')
  }

  return (

    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img 
          className="main-nav-logo-image"
          src={logo} 
          alt="Argent Bank Logo" 
          />
          <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="header-icon-wrapper">
             {/* Si connecté : affiche le prénom + Sign Out */}
            <Link 
              className="main-nav-item" 
              to="/profile"
            >
              <div className="profile-wrapper">
                <span className="userName">{user?.userName || user?.firstName}</span>
                <i className="fa-solid fa-user-circle fa-2xl"></i>
              </div>
            </Link>

            <div className="gear">
              <i className="fa-solid fa-gear fa-2xl"></i>
            </div>

            {/* Logout */}
            <Link 
              className="main-nav-item" 
              to="/"
              onClick={handleLogout}
            >
              <span className="sign-out"><i className="fa-solid fa-power-off fa-2xl"></i></span>
            </Link>
          </div>
        ) : (
          // Si déconnecté : affiche Sign In 
          <Link className="header-sign-in-button" to="/login">
              <div 
              className="sign-in-icon-header"><i className="fa fa-user-circle main-nav-icon fa-2xl"></i></div>
                <span className="sign-in-text">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  )
}