import React, { Component } from "react";
import {Link} from "react-router-dom";
import CustomerDataService from "../services/customer.service";
import { Modal,Button, ModalBody } from "react-bootstrap";
// import  "./global";
import {loggedIn} from '../actions/redirect.actions';
import {getCustomer,customerCart,customerOrders,customerWishlist,get} from '../actions/customer.actions';
import {getAllItems} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect  
});  

class Login extends Component { 
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.login = this.login.bind(this);
    this.onUserIdChange = this.onUserIdChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = { 
        showModal: false,
        userId: "",
        password: "",
        message: "",
    };
  }

  static propTypes = {  
    loggedIn: PropTypes.func.isRequired,  
    getCustomer: PropTypes.func.isRequired,
    getAllItems: PropTypes.func.isRequired,
    customerWishlist: PropTypes.func.isRequired,
    customerCart: PropTypes.func.isRequired,
    customerOrders: PropTypes.func.isRequired,
  };
  
  close(){
    this.setState({showModal:!this.state.showModal})
  }
  onUserIdChange(e){
    this.setState({userId:e.target.value});
  }
  onPasswordChange(e){
    this.setState({password:e.target.value});
  }
  login(){

    var data ={
      userId: this.state.userId,
      password: this.state.password
    }
    CustomerDataService.login(data)
    .then(response=>{
      console.log(response.data.message);
      if(response.data.message == "Siggned In"){
        this.setState({showModal:!this.state.showModal,});
      //  Sets the redirect to false as user logged in and sets the customer profile in customer reducer state.
        this.props.getCustomer();
        this.props.getAllItems();
        this.props.customerWishlist();
        this.props.customerCart();
        this.props.customerOrders();
        this.props.loggedIn();
        this.props.history.push('/customer');
      }
      else{
        console.log(response.data.message);
        this.setState({message:response.data.message});
      }
    })
    .catch(e=>{
      console.log(e);
      this.setState({message:e});
    })
  }
  render() {
    const {message} = this.state;

      return(
          <div >
            <header className='jumbotron' style={{backgroundColor:"#006080"}} >
             <div className='row'>
                 <div className="col-sm-8 col-12">
                    <h1 style={{color:"white"}}> SINDRA Shopping..!! </h1>
                 </div>
             </div>
            </header>
            <div className="container">
                <h1> Login Form </h1>
                <center>
                    <Link className='col-sm-4 btn btn-info btn-lg' onClick={this.close} > CUSTOMER LOGIN</Link>
                </center>
            </div>    
            <footer style={{position:"fixed",bottom:"0",textAlign:"center",width:'100%'}}>
                <hr />
                <p>copyright &copy; 2021</p>
            </footer>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Login Form</Modal.Title>
                </Modal.Header>
                <ModalBody>
                <span className="textCenter" style={{color:'red'}}> {message} </span>
                <table className='table table-borderless'>
                   <tr>
                       <td>User ID</td>
                       <td><input className='form-control' type="text" onChange={this.onUserIdChange}/></td>
                   </tr>
                   <tr>
                      <td>Password</td>
                      <td><input className='form-control' type="password" onChange={this.onPasswordChange} /></td>
                  ` </tr>
                    <tr>
                      <td colSpan="2">
                        <display6>Not a registered Customer? Register here </display6>
                        <Link to="/register">Register</Link>
                      </td>
                    </tr>
                </table>
                </ModalBody>
                <Modal.Footer>
                  <Button variant="secondary" onClick= {this.close}>Close</Button>
                  <Button variant="primary" onClick={this.login}>Login</Button>
                </Modal.Footer>                
            </Modal>
          </div>
      )
  }
}
export default connect(mapStateToProps,{loggedIn,getCustomer,getAllItems,customerCart,customerOrders,customerWishlist})(Login);