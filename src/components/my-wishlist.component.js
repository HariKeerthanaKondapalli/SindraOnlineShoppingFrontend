import React, { Component } from "react";
import {customerWishlist} from '../actions/customer.actions';
import {removeFromWishlist,getAllItems} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ItemDetails from "./item-details.component";
import Item from './item.component';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  wishlist: state.customerReducer.wishlist,
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
    };
  }
  static propTypes = {  
    customerWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired, 
    getAllItems: PropTypes.func.isRequired, 
  };

  componentDidMount() {
    console.log(this.props.wishlist);
    this.props.customerWishlist();
    this.props.getAllItems();
  }
  refreshList(){
    this.props.customerWishlist();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }
  setActiveItem(item ,index){
    console.log(this.props.state);
    if(this.state.currentIndex != index){
      // this.props.getCurrentItemDetails(item.id);
      this.setState({
        currentItem: item,
        currentIndex: index,
      });
    }
    else{
      // this.props.getCurrentItemDetails(null);
      this.setState({
        currentItem: null,
        currentIndex:-1,
      })
    }
    // this.props.customerWishlist();
    // this.refreshList();
    // console.log("Wishlist",this.state.wishlist);
  }
  render() {
    const {  currentIndex,currentItem } = this.state;
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
            {currentItem != null ?(
              <ItemDetails id={currentItem.id} from="my-wishlist" />
          ):(<ItemDetails id="null" from="my-wishlist" />)}
            </div>
          </div>
        
      );
    }
}
export default connect(mapStateToProps,{customerWishlist,getAllItems,removeFromWishlist})(MyWishlist);
