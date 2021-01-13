import React, { Component } from "react";
import {Link} from "react-router-dom";
import CustomerDataService from "../services/customer.service";
import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai";
// import "./global";
import {customerWishlist} from '../actions/customer.actions';
import {addToCart,removeFromWishlist,removeFromCart} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  wishlist: state.customerReducer.wishlist,
});  

class MyWishlist extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomerWishlist = this.retrieveCustomerWishlist.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // {id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:false,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:false,cart:true}
    // items:[{id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:true,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:true,cart:true}],
    this.state = {
        items:[],
        currentItem: null,
        currentIndex: -1,
        currentImage:null,
        // redirect: global.redirect,
    };
  }
  static propTypes = {  
    customerWishlist: PropTypes.func.isRequired, 
    addToCart: PropTypes.func.isRequired,  
    removeFromCart: PropTypes.func.isRequired,  
    removeFromWishlist: PropTypes.func.isRequired,  
  };

  componentDidMount() {
    // this.retrieveCustomerWishlist();
    console.log(this.props.wishlist);
    this.props.customerWishlist();
  }
  retrieveCustomerWishlist(){
      CustomerDataService.wishllist()
      .then(response=>{
        this.setState({
            items: response.data
          });
      })
      .catch(e=>{
          console.log(e);
      });
  }
  refreshList(){
    // this.retrieveCustomerWishlist();
    this.props.customerWishlist();
    this.setState({
      currentItem: null,
      currentIndex: -1,
      currentImage:null
    });
  }
  setActiveItem(item ,index){
    if(this.state.currentIndex != index){
    var bufferBase64 = new Buffer( item.photo.data, 'binary' ).toString('base64');
    this.setState({
        currentIndex:index,
        currentItem:item,
        currentImage: bufferBase64,
    })}
    else{
      this.setState({
        currentItem: null,
        currentIndex:-1,
        currentImage:null
      })
    }
  }
  addToWishlist(item){
    if(item.wishlist === true){
      // CustomerDataService.removeFromWishlist(item.id);
      this.props.removeFromWishlist(item.id);
      item.wishlist = false;
      this.props.customerWishlist();
      this.refreshList();
    }
    // else{
    //   CustomerDataService.addToWishlist(item.id);
    //   item.wishlist = true;
    // }
  }
  addToCart(item){
    if(item.cart === true){
      // CustomerDataService.removeFromCart(item.id);
      this.props.removeFromCart(item.id);
      item.cart = false;
    }
    else{
      // CustomerDataService.addToCart(item.id);
      this.props.addToCart(item.id);
      item.cart = true;
    }
  }

  render() {
    const { currentItem, currentIndex,items,currentImage } = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
      return(
        <div className="list row">
            <div className="col-md-6">
            <h4>My Wishlist</h4>

            <ul className="list-group">
              {this.props.wishlist &&
                this.props.wishlist.map((item, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveItem(item, index)}
                    key={index}
                  >
                    <img style={{width:150,height:150}} src={"data:image/jpeg;base64," + new Buffer( item.photo.data, 'binary' ).toString('base64')} />
                    <br/>
                    {item.name}
                  </li>
                ))}
            </ul>
            </div>
            <div>
              {currentItem ? (
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
                    {/* {currentImage} */}
                    <img style={{width:300,height:300}} src={"data:image/jpeg;base64," + currentImage}/>
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
        </div>
        
      );
    }
}
export default connect(mapStateToProps,{customerWishlist,removeFromWishlist,removeFromCart,addToCart})(MyWishlist);
