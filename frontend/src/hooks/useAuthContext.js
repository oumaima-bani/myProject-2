//we built this hook so we can use workout context value in any other components in the future

import { AuthContext } from "../context/AuthContext.js";
import {useContext} from 'react';
 
export const useAuthContext = () => {
    const context = useContext(AuthContext)


    if(!context){
        throw Error('useWorkoutsAuth must be used inside a AuthContextProvider')
    } 

    return context
}




