const init_state = {
    userName : "",
    fullName : "",
    email : "",
    role : "",
    errMsg: "",
    storageIsChecked: false,
    id : 0
}

const reducer = (state = init_state, action) => {
    switch (action.type){
        case "USER_LOGIN":
            return {...state,...action.payload, storageIsChecked : true}
            break
        case "USER_ERROR":
            return {...state, errMsg : action.payload}
            break
        case "USER_LOGOUT":
            return {...init_state, storageIsChecked : true}
            break
        case "CHECK_STORAGE":
            return {...state, storageIsChecked : true}
            break
        default:
            return state;
            break
    }
}

export default reducer;