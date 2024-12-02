import { createContext, useReducer, useEffect} from 'react'


export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {user: action.payload}
        case 'LOGOUT':
             return {user: null}
        default:
            return state
    }
}

// A custom component that will wrap the entire app and provide a value from this context  
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null 
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])//[]: means that useEffect() function runs just once

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}