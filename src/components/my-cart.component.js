import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Modal,Button, ModalBody } from "react-bootstrap";
import { customerCart } from "../actions/customer.actions";
import { getAllItems } from "../actions/items.actions";
import ItemDetails from './item-details.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Item from './item.component';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect ,
  cart : state.customerReducer.cart,
  customer: state.customerReducer.customer,
});  

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.buyItems = this.buyItems.bind(this);
    this.close = this.close.bind(this);
    this.transaction = this.transaction.bind(this);
    this.transactionSuccess = this.transactionSuccess.bind(this);
    this.success =this.success.bind(this);
    this.state = {
        items:[],
        currentItem: null,
        currentIndex: -1,
        buy:false,
        transaction:false,
        itemId:[],
        successMessage: "Your order has been placed successfully..!",
    };
  }
  static propTypes = {  
    customerCart: PropTypes.func.isRequired,
    getAllItems: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.customerCart();
    this.props.getAllItems();
  }
  refreshList(){
    this.props.customerCart();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }
  setActiveItem(item ,index){
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
  }
  buyItems(items){
    this.close();
    this.setState({
        itemId:items,
    })
    this.transaction();
  }
  close(){
    // this.props.customerCart();
    // this.refreshList();
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
    const { currentIndex,successMessage,currentItem } = this.state;
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
                       <Item id = {item.id} />
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
            {currentItem != null ?(
              <ItemDetails id={currentItem.id} from="my-cart" />
              ):(<ItemDetails id="null" from="my-cart" />)}
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
export default connect(mapStateToProps,{customerCart,getAllItems})(MyCart);
