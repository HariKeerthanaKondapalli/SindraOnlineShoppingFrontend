import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";
import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai";
import {removeFromWishlist,addToWishlist,removeFromCart,addToCart,getCurrentItemDetails} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  items: state.itemsReducer.items,
  state: state,
  currentItem: state.itemsReducer.currentitem,
  currentImage: state.itemsReducer.currentimage,
});  

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      currentItem: null,
      currentIndex: -1,
      currentImage: null,
    };
  }

  static propTypes = {  
    removeFromWishlist: PropTypes.func.isRequired,  
    addToWishlist: PropTypes.func.isRequired,  
    removeFromCart: PropTypes.func.isRequired,  
    addToCart: PropTypes.func.isRequired,  
    // getAllItems: PropTypes.func.isRequired,
    getCurrentItemDetails : PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log("ITEM DETAILS",this.props.state);
  }

  addToWishlist(item){
    if(item.wishlist === true){
      // CustomerDataService.removeFromWishlist(item.id);
      // item.wishlist = false;
      this.props.removeFromWishlist(item.id);
      item.wishlist = false;
    }else{
      this.props.addToWishlist(item.id);
      item.wishlist = true;
    }
  }
  addToCart(item){
    if(item.cart === true){
      this.props.removeFromCart(item.id);
      item.cart = false;
    }else{
      this.props.addToCart(item.id);
      item.cart = true;
    }
  }
  render() {
    // const { searchTitle,currentItem, currentIndex,items,currentImage } = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
    return (
        <div className="col-md-6">
          {this.props.currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {this.props.currentItem.name}
              </div>
              <div>
                <label>
                  <strong>Brand:</strong>
                </label>{" "}
                {this.props.currentItem.brand}
              </div>
              <div>
                <label>
                  <strong>Photo:</strong>
                </label>{" "}
                <img style={{width:300,height:300}} src={"data:image/jpeg;base64," + this.props.currentImage}/>
              </div>
              <div>
                <label>
                  <strong>Material Type:</strong>
                </label>{" "}
                {this.props.currentItem.material_type}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {this.props.currentItem.price}
              </div>
              <div>
                <label>
                  <strong>No.of Items left:</strong>
                </label>{" "}
                {this.props.currentItem.total_items}
              </div>

              <Link
                className="badge badge-warning mr-4"
                onClick={()=>this.addToCart(this.props.currentItem)}
              > {this.props.currentItem.cart?"Remove from Cart": "Add to Cart"}
              </Link>
              <Link
                className="badge badge-warning mr-8"
                onClick={() => this.addToWishlist(this.props.currentItem)}
              >               
                {this.props.currentItem.wishlist?<AiFillHeart/>:<AiOutlineHeart/>}
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
}
export default connect(mapStateToProps,{removeFromWishlist,addToWishlist,removeFromCart,addToCart,getCurrentItemDetails})(ItemDetails);