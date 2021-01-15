import React, { Component } from "react";
import {customerWishlist} from '../actions/customer.actions';
import {removeFromWishlist,getCurrentItemDetails} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ItemDetails from "./item-details.component";
import Item from './item.component';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  wishlist: state.customerReducer.wishlist,
  currentItem: state.itemsReducer.currentItem,
  state:state,
});  

class MyWishlist extends Component {
  constructor(props) {
    super(props);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
        currentItem: null,
        currentIndex: -1,
        currentImage:null,
        wishlist:false,
    };
  }
  static propTypes = {  
    customerWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,  
    getCurrentItemDetails: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log(this.props.wishlist);
    this.props.customerWishlist();
  }
  refreshList(){
    this.props.customerWishlist();
    this.setState({
      currentItem: null,
      currentIndex: -1,
      currentImage:null
    });
  }
  setActiveItem(item ,index){
    console.log(this.props.state);
    console.log("current Index",this.state.currentIndex);
    console.log("item Index",index);
    if(this.state.currentIndex != index){
      this.props.getCurrentItemDetails(item.id);
      this.setState({
        currentItem: item,
        currentIndex: index,
        // wishlist: item.wishlist,
      });
    }
    else{
      this.props.getCurrentItemDetails(null);
      this.setState({
        currentItem: null,
        currentIndex:-1,
        // wishlist:false,
      })
    }
    // this.props.customerWishlist();
    // this.refreshList();
    // console.log("Wishlist",this.state.wishlist);
  }
  render() {
    const {  currentIndex } = this.state;
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
                    <Item id={item.id} />
                  </li>
                ))}
            </ul>
            </div>
            <div>
              {/* {this.state.wishlist?( */}
              <ItemDetails/>
            </div>
          </div>
        
      );
    }
}
export default connect(mapStateToProps,{customerWishlist,removeFromWishlist,getCurrentItemDetails})(MyWishlist);
