import React, { Component } from "react";
import {Link} from "react-router-dom";
import CustomerDataService from "../services/customer.service";
import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai";
import { Modal,Button, ModalBody } from "react-bootstrap";
// import "./global";
import { customerCart } from "../actions/customer.actions";
import { removeFromCart,addToWishlist,removeFromWishlist } from "../actions/items.actions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect ,
  cart : state.customerReducer.cart,
  customer: state.customerReducer.customer,
});  

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomerCart = this.retrieveCustomerCart.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.buyItems = this.buyItems.bind(this);
    this.close = this.close.bind(this);
    this.transaction = this.transaction.bind(this);
    this.transactionSuccess = this.transactionSuccess.bind(this);
    this.success =this.success.bind(this);
    // {id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:false,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:false,cart:true}
    // items:[{id:"1", name:"Muted Hazelnut Geometric Yoke Kurta Set",material_type:"Kurta Set",brand:"Indo Era",price:"899",total_items:"7",wishlist:true,cart:false},{id:"2", name:"White Salwar",material_type:"Salwar Set",brand:"Indo Era",price:"999",total_items:"7",wishlist:true,cart:true}],
    // items:[],
    this.state = {
        items:[],
        currentItem: null,
        currentIndex: -1,
        currentImage:null,
        address:"",
        pincode:"",
        country:"",
        buy:false,
        transaction:false,
        itemId:[],
        successMessage: "Your order has been placed successfully..!",
        // redirect: global.redirect,
    };
  }
  static propTypes = {  
    removeFromCart: PropTypes.func.isRequired,  
    removeFromWishlist: PropTypes.func.isRequired,
    addToWishlist: PropTypes.func.isRequired,
    customerCart: PropTypes.func.isRequired,
  };
  componentDidMount() {
    // this.retrieveCustomerCart();
    console.log(this.props.cart);
    // this.retrieveCustomerAddress();
    console.log(this.props.customer);
    this.props.customerCart();
  }
  retrieveCustomerCart(){
      CustomerDataService.cart()
      .then(response=>{
        this.setState({
            items: response.data
          });
      })
      .catch(e=>{
          console.log(e);
      });
  }
  retrieveCustomerAddress(){
      CustomerDataService.get()
      .then(response=>{
          this.setState({
              address:response.data.address,
              pincode:response.data.pincode,
              country:response.data.country,
          })
      })
  }
  refreshList(){
    // this.retrieveCustomerCart();
    this.props.customerCart();
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
    //   this.refreshList();
      item.wishlist = false;
    }
    else{
      // CustomerDataService.addToWishlist(item.id);
      this.props.addToWishlist(item.id);
      item.wishlist = true;
    }
  }
  addToCart(item){
    if(item.cart === true){
      // CustomerDataService.removeFromCart(item.id);
      this.props.removeFromCart(item.id);
      item.cart = false;
      this.props.customerCart();
      this.refreshList();
    }
    // else{
    //   CustomerDataService.addToCart(item.id);
    //   item.cart = true;
    // }
  }
  buyItems(items){
    this.close();
    this.setState({
        itemId:items,
    })
    this.transaction();
  }
  close(){
    this.setState({buy:!this.state.buy});
  }
  transaction(){
    this.setState({transaction:!this.state.transaction});
  }
  success(){
    this.setState({success:!this.state.success});
  }
  transactionSuccess(){
    this.transaction();
    var items = this.state.itemId;
    for (var i=0;i<items.length;i++){
        CustomerDataService.buy(items[i].id)
        .then(response=>{
          this.setState({successMessage:"Your order has been placed successfully..!"})
        })
        .catch(e=>{
          this.setState({successMessage:"There was an error in placing your order.!Please try again later.."})
        });
        console.log(this.state.successMessage);
    }
    console.log("Last :",this.state.successMessage);
    this.success();
  }
  render() {
    const { currentItem, currentIndex,items,address,pincode,country,successMessage,currentImage } = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
      return(
        <div className="list row col-10">
            <div className="col-md-6">
                <h4>My Cart</h4>

                <ul className="list-group">
                  {this.props.cart &&
                    this.props.cart.map((item, index) => (
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
                <br/>
                <button
                className="btn btn-info mr-4"
                onClick={this.close}>
                Buy All
                </button>
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
            <Modal show={this.state.buy} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Items</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <table className='table table-borderless'>
                    <tr>
                        <td>Items:</td>
                        <td>
                        <ul className="list-group">
                            {this.props.cart &&
                            this.props.cart.map((item, index) => (
                        <li key={index}>                                  
                                {item.name}
                                </li>
                            ))}
                        </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{this.props.customer.address}</td>
                    </tr>
                    <tr>
                        <td>PinCode:</td>
                        <td>{this.props.customer.pincode}</td>
                    </tr>
                    <tr>
                        <td>Country:</td>
                        <td>{this.props.customer.country}</td>
                    </tr>
                    </table>    
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick= {this.close}>Close</Button>
                    <Button variant="primary" onClick={() =>this.buyItems(this.props.cart)}>Buy</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.transaction} onHide={this.transaction}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    Currently unavailable for online payments. Only Cash on delivery(COD) is available.
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick= {this.transaction}>Close</Button>
                    <Button variant="primary" onClick={this.transactionSuccess}>Buy</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.success} onHide={this.success}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    {successMessage}
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick= {this.success}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
      )
    }
}
export default connect(mapStateToProps,{removeFromCart,customerCart,removeFromWishlist,addToWishlist})(MyCart);
