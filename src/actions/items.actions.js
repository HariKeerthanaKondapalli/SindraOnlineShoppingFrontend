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
    // return dispatch => {  
        // return dispatch({  
            // type: 'GET_ALL_ITEMS',
            // data: [{id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:true,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:false,cart:true}]
        // });  
    // }  
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
                type:'REMOVE_FROM_WISHLIST',
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
                type:'REMOVE_FROM_WISHLIST',
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
                type:'REMOVE_FROM_WISHLIST',
                data:id,
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
} ;