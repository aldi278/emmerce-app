import Axios from "axios"
import {API_URL} from '../../constant/API'

export const registerUser = ({fullName, userName, email, password}) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users`,{
            fullName,
            userName,
            email,
            password,
            role : "user"
        })
        .then((result) => {
            delete result.data.password
            dispatch({
                type : "USER_LOGIN",
                payload : result.data
            })
            alert("Register Berhasil!")
        })
        .catch(() => {
            alert("Register Gagal!")
        })
    }
}

export const loginUser = ({userName, password}) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, { 
            params : {
                userName,
        }})
        .then((result) => {
            if(result.data.length){
                if(password === result.data[0].password){
                    delete result.data[0].password
                    localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
                    dispatch({
                        type: "USER_LOGIN",
                        payload: result.data[0]
                    })
                }else{
                    //handle password error
                    dispatch({
                        type: "USER_ERROR",
                        payload: "Wrong password"
                    })
                }
            }else{
                //handle username not found
                dispatch({
                    type: "USER_ERROR",
                    payload: "User not found"
                })
            }
            
        })
        .catch(() => {
            alert("Login Gagal!")
        })
    }
}

export const logoutUser = () => {
    localStorage.removeItem("userDataEmmerce")
    return {
        type : "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params : {
                id : userData.id
            }
        })
        .then((result) => {
            delete result.data[0].password
            localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch(()=> {
            alert("terjadi kesalahan pada sistem")
        })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE"
    }
}