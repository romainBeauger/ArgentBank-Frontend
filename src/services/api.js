const API_URL = 'http://localhost:3001/api/v1'

// Fonction pour se connecter
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data.message || "Invalid credentials")
        }

        return data.body.token // retourne le token
        
    } catch (error) {
        console.error('Login error:', error.message);
        throw error
    }
}


// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data.message || "Failed to fetch profile") 
        }

        return data.body // Retourne les données utilisateur

    } catch (error) {
        console.error('Failed to get user profile error:', error.message);
        throw error
    }
}

// Fonction pour modifier le username
export const updateUserProfile = async (token, userName) => {
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
    });

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
    }

    return data.body

    } catch (error) {
        console.error('Failed to update profile error:', error.message);
        throw error;
    }
}