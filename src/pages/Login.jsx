import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure, setUser } from "../store/authSlice"
import { loginUser, getUserProfile } from "../services/api"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Recupère l'état depuis Redux
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth)    

    // Si déjà connecté redirige vers /profile
    useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()       
         // Commence le login
         dispatch(loginStart())

        try {
            // Appelle l'API pour se connecter
            const token = await loginUser(email, password)

            // Si "Remember me" est coché, sauvegarde le token
            if (rememberMe) {
                localStorage.setItem('token', token);
            }

            // Stocke le token dans Redux
            dispatch(loginSuccess({ token }))

            // Récupère les infos utilisateur 
            const userData = await getUserProfile(token)

            // Stocke les infos utilisateur dans Redux
            dispatch(setUser(userData))

            // Redirige vers la page Profile
            navigate ('/profile')
            
        } catch (error) {
            // En cas d'erreur, stocke le message d'erreur
            dispatch(loginFailure(error.message))
        }
    }

  return (

    <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1 className="sign-in-text">Sign In</h1>

            {/* Afficher message d'erreur si il existe */}
            {error && (
                <div className="errorSignIn"> 
                    {error}
                </div>
            )}

            <form onSubmit= {handleSubmit} >

                {/* INPUT USERNAME */}
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input 
                        type= "text" 
                        id= "username"
                        value= {email}
                        onChange={(e) => setEmail(e.target.value)} 
                        autoComplete="username"
                        required
                    />
                </div>

                {/* INPUT PASSWORD */}
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input 
                        type= "password" 
                        id= "password"
                        value= {password}
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete="current-password"
                        required
                    />
                </div>

                {/* CHECKBOX */}
                <div className="input-remember">
                    <input 
                        type= "checkbox" 
                        id= "remember-me"
                        value= {rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)} 
                        autoComplete="current-password"
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                
                {/* BOUTON SUBMIT */}
                {/* Désactive le bouton pendant le chargement */}
                <button 
                    type="submit" 
                    className="sign-in-button"                    
                    disabled={loading}                
                >
                    Sign In
                </button>

            </form>
        </section>
    </main>
  )
}