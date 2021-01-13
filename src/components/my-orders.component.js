import { globalEval } from "jquery";
import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
// import "./global";
import {customerOrders} from '../actions/customer.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect  ,
  orders: state.customerReducer.orders,
});  

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomerOrders = this.retrieveCustomerOrders.bind(this);
    // this.addToWishlist = this.addToWishlist.bind(this);
    // this.addToCart = this.addToCart.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // {id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:false,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:false,cart:true}
    // items:[{id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:true,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:true,cart:true}],
    this.state = {
        items:[],
        currentItem: null,
        currentIndex: -1,
        currentImage: null,
        // redirect:global.redirect,
    };
  }
  static propTypes = {  
  customerOrders: PropTypes.func.isRequired,  
  };

  componentDidMount() {
    // this.retrieveCustomerOrders();
    this.props.customerOrders();
  }
  retrieveCustomerOrders(){
      CustomerDataService.orders()
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
    // this.retrieveCustomerOrders();
    this.props.customerOrders();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }
  setActiveItem(item ,index){
    if(index!= this.state.currentIndex){
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
            <h4>My Orders</h4>

            <ul className="list-group">
              {this.props.orders &&
                this.props.orders.map((item, index) => (
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
export default connect(mapStateToProps,{customerOrders})(MyOrders);
