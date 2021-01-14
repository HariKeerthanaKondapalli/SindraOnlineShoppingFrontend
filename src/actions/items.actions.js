import http from "../http-common";

export function getAllItems(){
    return function (dispatch){
        http.get("/items")
        .then(response=>{
            console.log(response.data);
            dispatch({
                type:'GET_ALL_ITEMS',
                data:response.data,
            })
        })
        .catch(e=>{
            console.log(e);
        })

    }
};
export function removeFromWishlist(id){
    return function(dispatch){
        http.get(`/deleteWishlist/${id}`)
        .then(response=>{
            dispatch({
                type:'REMOVE_FROM_WISHLIST',
                data:id,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
} ;
export function removeFromCart(id){
    return function(dispatch){
        http.get(`/deleteCart/${id}`)
        .then(response=>{
            dispatch({
                type:'REMOVE_FROM_CART',
                data:id,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
} ;
export function addToWishlist(id){
    return function(dispatch){
        http.get(`/wishlist/${id}`)
        .then(response=>{
            dispatch({
                type:'ADD_TO_WISHLIST',
                data:id,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
} ;
export function addToCart(id){
    return function(dispatch){
        http.get(`/cart/${id}`)
        .then(response=>{
            dispatch({
                type:'ADD_TO_CART',
                data:id,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
} ;
export function getCurrentItemDetails(id){
    return function(dispatch){
    if(id != null){
        http.get(`/currentitem/${id}`)
        .then(response=>{
            var bufferBase64 = new Buffer( response.data.photo.data, 'binary' ).toString('base64');
            dispatch({
                type:'GET_CURRENT_ITEM_DETAILS',
                data:response.data,
                image: bufferBase64,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
    else{
        dispatch({
            type:'GET_CURRENT_ITEM_DETAILS',
            data: null,
            image: null,
        })
    }
}};