import { useState } from "react"

export default function Profile() {

    const [isEditing, setIsEditing] = useState(false)
    const [userName, setUserName] = useState('Tony')
    const [newUserName, setNewUserName] = useState('')

    // Données temporaires (plus tard, elles viendront de Redux)
    const user = {
        firstName: 'Tony',
        lastName: 'Stark'
    };

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
        setNewUserName(userName)
        setIsEditing(true)
    }

    const handleSave = (e) => {
        e.preventDefault()
        setUserName(newUserName)
        setIsEditing(false)
        console.log(`Nouveau Username: ${newUserName}`);      
        // Plus tard, on enverra à l'API via Redux  
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
                        <h1>Welcome back <br /> {userName} {user.lastName} </h1>
                        
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
                                > Save                                    
                                </button>
                                
                                <button 
                                    className="edit-button"
                                    onClick={handleCancel}
                                > Cancel                                    
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
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
          </section>  
        ))}
    </main>

  )
}