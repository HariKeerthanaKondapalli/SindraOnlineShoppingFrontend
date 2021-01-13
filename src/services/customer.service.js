import http from "../http-common";

class CustomerDataService {
  get() {
    return http.get(`/customer`);
  }
  update(id, data) {
    return http.put(`/customer/${id}`, data);
  }
  delete(id) {
    return http.get(`/deleteCustomer/${id}`);
  }
  login(data){
    return http.put('/customer/login',data);
  }
  register(data){
    return http.put('/customer/register',data);
  }
  logout(){
    return http.get(`/customer/logout`);
  }
  wishllist(){
    return http.get(`/customer/wishlist`);
  }
  cart(){
    return http.get(`/customer/cart`);
  }
  orders(){
    return http.get(`/customer/orders`);
  }
  addToWishlist(item){
    return http.get(`/wishlist/${item}`);
  }

  removeFromWishlist(item){
    return http.get(`/deleteWishlist/${item}`);
  }

  addToCart(item){
    return http.get(`/cart/${item}`);
  }

  removeFromCart(item){
    return http.get(`/deleteCart/${item}`);
  }
  buy(item){
    return http.get(`/buy/${item}`);
  }

}

export default new CustomerDataService();