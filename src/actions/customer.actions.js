import http from "../http-common";

export function getCustomer() {  
    return function (dispatch) {  
        http.get(`/customer`)
        .then(response=>{
            console.log(response.data);
            dispatch({
                type: "GET_CUSTOMER",
                data: response.data,
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  
    // return dispatch => {  
        // return dispatch({  
            // type: 'GET_CUSTOMER',
            // data: {'name':'hari','id':'3'},
        // });  
    // }  
}; 
export function updateCustomer(id,data) {  
    return function (dispatch) {  
        http.put(`/customer/${id}`, data)
        .then(response=>{
            console.log(response.data);
            dispatch({
                type: "UPDATE_CUSTOMER",
                data: data,
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  

// return dispatch => {  
    // return dispatch({  
        // type:'UPDATE_CUSTOMER',
        // data: data,
    // });  
// }  
}; 
export function deleteCustomer(id) {  
    return function (dispatch) {  
        http.get(`/deleteCustomer/${id}`)
        .then(response=>{
            dispatch({
                type: "DELETE_CUSTOMER",
                data: {},
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  
};
export function customerWishlist(){
    return function (dispatch) {  
        http.get(`/customer/wishlist`)
        .then(response=>{
            dispatch({
                type: "CUSTOMER_WISHLIST",
                data: response.data,
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  
}
export function customerCart(){
    return function (dispatch) {  
        http.get(`/customer/cart`)
        .then(response=>{
            dispatch({
                type: "CUSTOMER_CART",
                data: response.data,
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  
}
export function customerOrders(){
    return function (dispatch) {  
        http.get(`/customer/orders`)
        .then(response=>{
            dispatch({
                type: "CUSTOMER_ORDERS",
                data: response.data,
              })
        }) 
        .catch(e=>{
            console.log(e);
        })   
    }  
}
export function get() {  
    return dispatch => {  
        return dispatch({  
            type:'GET_CUSTOMER',
            data: {'name':'hari','id':'3'},
        });  
    }  
    }; 
    
