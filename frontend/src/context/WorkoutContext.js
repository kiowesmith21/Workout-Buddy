import { createContext, useReducer } from 'react'

export const WorkoutContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //take workout payload, spread out data into state workouts data
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //filter through workouts, if id not equal, keep those workouts, otherwise delete
            }    
        default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}

