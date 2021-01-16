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
                wishlist :action.data,
                wishlistLength : action.length,
            };
        case 'CUSTOMER_CART':
            return{
                ...state,
                cart :action.data,
                cartLength: action.length,
            }
        case 'CUSTOMER_ORDERS':
            return{
                ...state,
                orders :action.data,
                orderLength : action.length,
            }
        case 'REMOVE_FROM_WISHLIST' :
            return{
                ...state,
                wishlist: state.wishlist.filter(item => item.id != action.data),
                wishlistLength: state.wishlistLength -1,
            }
        case 'REMOVE_FORM_CART':
            return{
                ...state,
                cart: state.cart.filter(item=> item.id !== action.data),
                cartLength: state.cartLength -1,
            }
        // case 'ADD_TO_WISHLIST':
        //     var item = action.item;
        //     // var length = state.wishlist.length;
        //     console.log("In add custoemr wishlist",item);
        //     return{
        //         ...state,
        //         wishlist:{ 
        //             ...state.wishlist,item
        //         }
        //     }
        // case 'ADD_TO_CART':
        //     var item = action.item;
        //     return{
        //         ...state,
        //         wishlist:{
        //             ...state.wishlist,
        //             item
        //         }
        //     }
        default:  
            return state;  
    }

}

export default customerReducer ;