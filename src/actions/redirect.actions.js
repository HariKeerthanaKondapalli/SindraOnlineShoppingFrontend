export function loggedIn() {  
    return dispatch => {  
        return dispatch({  
            type: 'LOGIN'
        });  
    }  
}; 
export function loggedOut() {  
    return dispatch => {  
        return dispatch({  
            type: 'LOGOUT'
        });  
    }  
}; 
