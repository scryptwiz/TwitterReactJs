const defaultState = {
    user:false,
    tweets:[]
}
const userReducer = (state=defaultState, action ) =>{
    if(action.type === "SET_USER"){
        let newState = {...state, user:action.payload}
        return newState;
    }
    if(action.type === "SET_TWEETS"){
        let newState = {...state, tweets:action.payload}
        return newState;
    }
    return state
}

export default userReducer;