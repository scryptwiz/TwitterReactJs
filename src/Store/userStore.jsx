const defaultState = {
    user:false,
}
const userReducer = (state=defaultState, action ) =>{
    if(action.type === "SET_USER"){
        let newState = {...state, user:action.payload}
        return newState;
    }
    return state
}

export default userReducer;