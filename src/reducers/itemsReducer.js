const initialState ={

};

const itemsReducer = (state = initialState, action) => {
    console.log("actiontype:",action.type);
    switch (action.type) {  
        case 'GET_ALL_ITEMS': 
            return {  
                ...state,
                items: action.data
            };
        case 'REMOVE_FROM_WISHLIST' :
            return {
                ...state,
            }
        case 'ADD_TO_WISHLIST' :
            return {
                ...state,
            }
        case 'REMOVE_FROM_CART' :
            return {
                ...state,
            }
        case 'ADD_TO_CART' :
            return {
                ...state,
            }
        default:  
            return state;  
    }

}

export default itemsReducer ;