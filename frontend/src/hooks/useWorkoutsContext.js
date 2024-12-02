//we built this hook so we can use workout context value in any other components in the future

import { WorkoutsContext } from "../context/WorkoutContext.js";
import {useContext} from 'react';
 
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)


    if(!context){
        throw Error('useWorkoutsContext must be used inside a workoutsContextProvider')
    }

    return context
}




