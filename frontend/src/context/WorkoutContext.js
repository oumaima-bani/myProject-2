//we're going to provide a global state here using react context : automatically page refreshing after update 
import { createContext,useReducer } from "react";

// creating a context named 'WorkoutsContext' 
export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {//state : refers to the old state
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload//set the new value of the state 
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts]
                //action.payload : the new creacted value(s)
                //...state.workouts: the rest of the values
            }
        case 'DELETE_WORKOUTS':
            return{
                workouts: state.workouts.filter(w =>w._id !== action.payload)
            }
        default:
            return state
        
    }
}

  
// provide the context to our app component tree (so that our components can access it)
export const WorkoutsContextProvider = ({children }) =>{//the children props represents the coponents that will use this context (the 'app' in our case)

    const [state, dispatch] = useReducer(workoutsReducer,{
        workouts: []
    })


    return(
        //here we wrap our app components that needs access to this context (the whole app in our case, that's why we implemented it in the index.js file)
        <WorkoutsContext.Provider value= {{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}