import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        // Action pour commencer le login 
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },

        // Action en cas de succès de login
        loginSuccess: (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.token = action.payload.token
            state.error = null
        },

        // Action en cas d'erreur du login
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // Action pour stocker les infos utilisateur
        setUser: (state, action) => {
            state.user = action.payload
        },

        // Action pour mettre à jour le username
        updateUserName: (state, action) => {
            if(state.user){
                state.user.userName = action.payload
            }
        },

        // Action pour se déconnecter
        logout: (state) => {
            state.token = null
            state.isAuthenticated = false
            state.user = null
            state.error = null
        }
    }
})

// Export des actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  updateUserName,
  logout,
} = authSlice.actions;

// Export du reducer
export default authSlice.reducer