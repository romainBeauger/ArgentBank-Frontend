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
          <>
             {/* Si connecté : affiche le prénom + Sign Out */}
            <Link 
              className="main-nav-item" 
              to="/profile"
            >
              <i className="fa fa-user-circle main-nav-icon"></i>
              {user?.firstName}
            </Link>

            <Link 
              className="main-nav-item" 
              to="/"
              onClick={handleLogout}
            >
              <i className="main-nav-icon fa fa-sign-out"></i>
                Sign Out
            </Link>
          </>
        ) : (
          // Si déconnecté : affiche Sign In 
          <Link className="main-nav-item" to="/login">
            <i className="main-nav-icon fa fa-user-circle"></i>
              Sign in
          </Link>
        )}
      </div>
    </nav>
  )
}