import { useState } from "react"
// import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    // const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`RememberMe: ${rememberMe}`);        
    }

  return (

    <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>

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
                <button type="submit" className="sign-in-button">Sign In</button>

            </form>

        </section>
    </main>

  )
}