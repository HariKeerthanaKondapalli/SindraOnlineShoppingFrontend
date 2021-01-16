const initialState ={

};

const itemsReducer = (state = initialState, action) => {
    console.log("actiontype:",action.type);
    switch (action.type) {  
        case 'GET_ALL_ITEMS': 
            return {  
                ...state,
                items: action.data,
                itemLength: action.length,
            };
        case 'REMOVE_FROM_WISHLIST' :
            return {
                ...state,
                items: state.items.map(
                    (item, i) => item.id === action.data ? {...item, wishlist: false}
                                            : item
                )
            };
        case 'ADD_TO_WISHLIST' :
            return {
                ...state,
                items: state.items.map(
                    (item, i) => item.id === action.data ? {...item, wishlist: true}
                                            : item
                )
            };
        case 'REMOVE_FROM_CART' :
            return {
                ...state,
                items: state.items.map(
                    (item, i) => item.id === action.data ? {...item, cart: false}
                                            : item
                )
            };
        case 'ADD_TO_CART' :
            return {
                ...state,
                items: state.items.map(
                    (item, i) => item.id === action.data ? {...item, cart: true}
                                            : item
                )
            };
        case 'GET_CURRENT_ITEM_DETAILS' :
            return {
                ...state,
                currentitem : action.data,
                currentimage : action.image,
            };
        default:  
            return state;  
    }

}

export default itemsReducer ;