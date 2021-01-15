import React, { Component } from "react";
import {customerOrders} from '../actions/customer.actions';
import { getCurrentItemDetails } from "../actions/items.actions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ItemDetails from './item-details.component';
import Item from './item.component';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect ,
  orders: state.customerReducer.orders,
});  

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.state = {
        currentItem: null,
        currentIndex: -1,
        currentImage: null,
    };
  }
  static propTypes = {  
  customerOrders: PropTypes.func.isRequired, 
  getCurrentItemDetails:PropTypes.func.isRequired, 
  };

  componentDidMount() {
    this.props.customerOrders();
  }
  setActiveItem(item ,index){
    if(this.state.currentIndex != index){
      this.props.getCurrentItemDetails(item.id);
      this.setState({
        currentItem: item,
        currentIndex: index,
      });
    }
    else{
      this.props.getCurrentItemDetails(null);
      this.setState({
        currentItem: null,
        currentIndex:-1,
      })
    }
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
                    <Item id={item.id} />
                  </li>
                ))}
            </ul>
            </div>
            <div>
              <ItemDetails/>
            </div>
        </div>
      );
    }
}
export default connect(mapStateToProps,{customerOrders,getCurrentItemDetails})(MyOrders);
