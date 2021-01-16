import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai";
import {removeFromWishlist,addToWishlist,removeFromCart,addToCart,getAllItems} from '../actions/items.actions';
import {customerCart,customerWishlist} from '../actions/customer.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  items: state.itemsReducer.items,
  state: state,
  itemsLength: state.itemsReducer.itemsLength,
  cartLength: state.customerReducer.cartLength,
  wishlistLength: state.customerReducer.wishlistLength,
  orderLength: state.customerReducer.orderLength,
});  

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state={
      // items: this.props.items,
      from:this.props.from,
    }
  }

  static propTypes = {  
    removeFromWishlist: PropTypes.func.isRequired,  
    addToWishlist: PropTypes.func.isRequired,  
    removeFromCart: PropTypes.func.isRequired,  
    addToCart: PropTypes.func.isRequired,  
    customerCart: PropTypes.func.isRequired,
    customerWishlist: PropTypes.func.isRequired,
    getAllItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllItems();
    this.props.customerCart();
    this.props.customerWishlist();
  }

  addToWishlist(item){
    if(item.wishlist === true){
      item.wishlist = false;
      this.props.removeFromWishlist(item.id);
      if(this.props.from == "my-wishlist" && item.wishlist == false){   
        this.props.customerWishlist();
        this.props.customerWishlist();
      }
      this.props.getAllItems();
    }else{
      this.props.addToWishlist(item.id);
      item.wishlist = true;
      this.props.getAllItems();
    }
  }
  addToCart(item){
    if(item.cart === true){
      this.props.removeFromCart(item.id);
      item.cart = false;
      if(this.props.from == "my-cart"){
        this.props.customerCart();
        // this.refreshList();
        this.props.customerCart();
      }
      this.props.getAllItems();
    }else{
      this.props.addToCart(item.id);
      this.props.addToCart(item.id);
      item.cart = true;
      this.props.getAllItems();
    }
  }
  refreshList(){
    this.props.customerWishlist();
    this.props.customerCart();
  }
  render() {
    const {from } = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
    else{
      if((this.props.orderLength === 0 && from === "my-orders") || (this.props.cartLength === 0 && from === "my-cart") || (this.props.wishlistLength ===0 && from === "my-wishlist") || (this.props.itemsLength === 0 && from==="all-items")){
      return (<div>
        <br/>
        <p>No Items so far in the list..</p>
      </div>)
      }
      if(this.props.id != "null"){
        var currentItem;
        this.props.items.map((item,index)=>{
          if(item.id === this.props.id){
            currentItem = item;
          }
        });
        return (
          <div className="col-md-6">
            {((from == "all-items" || from == "my-orders") || (from == "my-wishlist" && currentItem.wishlist) || (from =="my-cart" && currentItem.cart)) ? (
              <div>
                <h4>Item</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentItem.name}
                </div>
                <div>
                  <label>
                    <strong>Brand:</strong>
                  </label>{" "}
                  {currentItem.brand}
                </div>
                <div>
                  <label>
                    <strong>Photo:</strong>
                  </label>{" "}
                  <img style={{width:300,height:300}} src={"data:image/jpeg;base64," + new Buffer( currentItem.photo.data, 'binary' ).toString('base64')}/>
                </div>
                <div>
                  <label>
                    <strong>Material Type:</strong>
                  </label>{" "}
                  {currentItem.material_type}
                </div>
                <div>
                  <label>
                    <strong>Price:</strong>
                  </label>{" "}
                  {currentItem.price}
                </div>
                <div>
                  <label>
                    <strong>No.of Items left:</strong>
                  </label>{" "}
                  {currentItem.total_items}
                </div>
  
                <Link
                  className="badge badge-warning mr-4"
                  onClick={()=>this.addToCart(currentItem)}
                > {currentItem.cart?"Remove from Cart": "Add to Cart"}
                </Link>
                <Link
                  className="badge badge-warning mr-8"
                  onClick={() => this.addToWishlist(currentItem)}
                >               
                  {currentItem.wishlist?<AiFillHeart/>:<AiOutlineHeart/>}
                </Link>
  
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on Item name to get more details..!</p>
              </div>
            )
            }
          </div>
        );
      }
      else{
        return (
        <div>
          <br/>
          <p>Please click on Item name to get more details..!</p>
        </div>
        );
      }
    }
  }
}
export default connect(mapStateToProps,{removeFromWishlist,addToWishlist,removeFromCart,addToCart,customerWishlist,customerCart,getAllItems})(ItemDetails);