import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";
import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai";
import {removeFromWishlist,addToWishlist,removeFromCart,addToCart,getAllItems} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  items: state.itemsReducer.items,
  state: state,
});  

class AllItems extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.searchItem= this.searchItem.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      items:[],
      currentItem: null,
      currentIndex: -1,
      currentImage: null,
      searchTitle: "",
    };
  }

  static propTypes = {  
    removeFromWishlist: PropTypes.func.isRequired,  
    addToWishlist: PropTypes.func.isRequired,  
    removeFromCart: PropTypes.func.isRequired,  
    addToCart: PropTypes.func.isRequired,  
    getAllItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllItems();
    console.log(this.props.state);
    this.setState({
      items: this.props.items,
    })
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    if(searchTitle == ""){
      this.retrieveItems();
    }
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveItem(item, index) {
  if(this.state.currentIndex != index){
    var bufferBase64 = new Buffer( item.photo.data, 'binary' ).toString('base64');
    this.setState({
      currentItem: item,
      currentIndex: index,
      currentImage: bufferBase64,
    });
  }
  else{
    this.setState({
      currentItem: null,
      currentIndex:-1,
      currentImage:null
    })
  }
  }

  searchItem() {
    if(this.state.searchTitle != ""){
    ItemDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    else{
      this.retrieveItems();
    }
  }

  addToWishlist(item){
    if(item.wishlist === true){
      CustomerDataService.removeFromWishlist(item.id);
      item.wishlist = false;
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
    const { searchTitle,currentItem, currentIndex,items,currentImage } = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {this.props.items &&
              this.props.items.map((item, index) => (
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
        <div className="col-md-6">
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
export default connect(mapStateToProps,{removeFromWishlist,addToWishlist,removeFromCart,addToCart,getAllItems})(AllItems);