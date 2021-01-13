//For testing purpose redirect is set to false but make sure you change it to true before production.
const initialState = {redirect:true};

const redirect = (state = initialState, action) => {
    console.log("actiontype:",action.type);
    switch (action.type) {  
        case 'LOGIN': 
            return {  
                ...state,
                redirect: false
            };  
        case 'LOGOUT':
            return{
                ...state,
                redirect: true
            };
        default: 
            return state;
    }

}

export default redirect ;