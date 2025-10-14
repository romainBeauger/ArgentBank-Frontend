import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserName } from "../store/authSlice" // Action
import { updateUserProfile } from "../services/api" // Fonction API


export default function Profile() {

    const [isEditing, setIsEditing] = useState(false)
    const [newUserName, setNewUserName] = useState('')

    // Recupére les données depuis Redux
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.auth)

    if (!user) {
        return <div>Loading...</div>
    }

    const accounts = [
        {
        id: 1,
        title: 'Argent Bank Checking (x8349)',
        amount: '$2,082.79',
        description: 'Available Balance'
        },
        {
        id: 2,
        title: 'Argent Bank Savings (x6712)',
        amount: '$10,928.42',
        description: 'Available Balance'
        },
        {
        id: 3,
        title: 'Argent Bank Credit Card (x8349)',
        amount: '$184.30',
        description: 'Current Balance'
        }
    ];

    const handleEditClick = () => {
        setNewUserName(user.userName)
        setIsEditing(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            // Appelle l'API pour mettre à jour le username
            await updateUserProfile(token, newUserName)

            // Met à jour Redux
            dispatch(updateUserName(newUserName))

            setIsEditing(false)
            console.log(`Nouveau username : ${newUserName}`)
            
        } catch (error) {
            console.error("Error updating username: ", error)
            alert("Failed to update username")            
        } 
    }

    const handleCancel = () => {
        setIsEditing(false)
        setNewUserName('')
    }

    return (

    <main className="main bg-dark">
        <div className="header">
            {!isEditing ? (
                <>
                    <h1>Welcome back <br /> {user.firstName} {user.userName} {user.lastName}
                    </h1>
                    
                    <button 
                        className="edit-button"
                        onClick={handleEditClick}
                    >
                        Edit name
                    </button>
                </>
            ) : (
                <>
                    <h1>Edit user info</h1>
                    <form onSubmit={handleSave}>
                        
                        {/* USERNAME */}
                        <div className="edit-input-wrapper">
                            <label htmlFor="username">User name: </label>
                            <input 
                                type="text"
                                id="username" 
                                value={newUserName} 
                                onChange={(e) => setNewUserName(e.target.value)}   
                            />
                        </div>

                        {/* FIRST NAME */}
                        <div className="edit-input-wrapper">
                            <label htmlFor="firstName">First name: </label>
                            <input 
                                type="text"
                                id="firstName" 
                                value={user.firstName} 
                                disabled  
                            />
                        </div>

                        {/* LAST NAME */}
                        <div className="edit-input-wrapper">
                            <label htmlFor="lastName">Last name: </label>
                            <input 
                                type="text"
                                id="lastName" 
                                value={user.lastName} 
                                disabled  
                            />
                        </div>

                        {/* EDIT BUTTON */}
                        <div className="edit-buttons">
                            <button 
                                type="submit" 
                                className="edit-button"
                            > 
                                Save                                    
                            </button>
                            
                            <button 
                                className="edit-button"
                                onClick={handleCancel}
                            > 
                                Cancel                                    
                            </button>
                        </div>

                    </form>
                </>
                )
            }
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map((account) => (
          <section key={account.id} className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title"> {account.title} </h3>
                <p className="account-amount"> {account.amount} </p>
                <p className="account-amount-description"> {account.description} </p>
            </div>
            <div className="account-arrow">
                <i className="fa fa-chevron-right"></i>
            </div>
          </section>  
        ))}
    </main>

  )
}