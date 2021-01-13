const initialState ={

};

const customerReducer = (state = initialState, action) => {
    console.log("actiontype:",action.type);
    switch (action.type) {  
        case 'GET_CUSTOMER': 
            return {  
                ...state,
                customer : action.data               
                };  
        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                customer : action.data
        };
        case'DELETE_CUSTOMER':
            return {  
                ...state,
                customer : action.data   
                };  
        case 'CUSTOMER_WISHLIST':
            return{
                ...state,
                wishlist :action.data
            };
        case 'CUSTOMER_CART':
            return{
                ...state,
                cart :action.data
            }
        case 'CUSTOMER_ORDERS':
            return{
                ...state,
                orders :action.data
            }
        default:  
            return state;  
    }

}

export default customerReducer ;