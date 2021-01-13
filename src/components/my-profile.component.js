import React, { Component } from "react";
import {Link} from "react-router-dom";
import CustomerDataService from "../services/customer.service";
import { Modal,Button, ModalBody } from "react-bootstrap";

import {loggedOut} from '../actions/redirect.actions';
import {getCustomer,updateCustomer,deleteCustomer} from '../actions/customer.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  customer: state.customerReducer.customer,
  state: state,
});  

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.updateProfile = this.updateProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.close = this.close.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onMobileChange = this.onMobileChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onPinChange = this.onPinChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);

    this.state = {
      id: null,
      name : "",
      mobile: "",
      email : "",
      password: "",
      address: "",
      pincode: "",
      country: "",
      showModal: false,
    };
  }
    static propTypes = {  
        loggedOut: PropTypes.func.isRequired,  
        getCustomer: PropTypes.func.isRequired,
        updateCustomer:PropTypes.func.isRequired,
        deleteCustomer:PropTypes.func.isRequired,
    };

  componentDidMount() {
    console.log(this.props.state);
    this.setState({
        id:this.props.customer.id,
        name:this.props.customer.name,
        mobile:this.props.customer.mobile,
        email:this.props.customer.email,
        password:this.props.customer.password,
        address:this.props.customer.address,
        pincode:this.props.customer.pincode,
        country:this.props.customer.country,
    })
  }
    onNameChange(e){
        this.setState({name:e.target.value});
    }
    onMobileChange(e){
        this.setState({mobile:e.target.value});
    }
    onEmailChange(e){
        this.setState({email:e.target.value});
    }
    onPasswordChange(e){
        this.setState({password:e.target.value});
    }
    onAddressChange(e){
        this.setState({address:e.target.value});
    }
    onPinChange(e){
        this.setState({pincode:e.target.value});
    }
    onCountryChange(e){
        this.setState({country:e.target.value});
    }
    updateProfile(id){
        this.setState({showModal:!this.state.showModal})
        var data ={
            name :this.state.name,
            mobile: this.state.mobile,
            email:this.state.email,
            password: this.state.password,
            address: this.state.address,
            pincode: this.state.pincode,
            country:this.state.country,
        }
        this.props.updateCustomer(id,data);
    }

    deleteProfile(id){
        console.log("id :",id);
        this.props.deleteCustomer(id);
        this.logout(id);
    }

    logout(id){
        console.log("id: ",id);
        CustomerDataService.logout();
        this.props.loggedOut();
        this.props.history.push('/login');
    }
    close(){
        this.setState({showModal:!this.state.showModal})
    }
    
  render() {
    const { id,name,mobile,email,password,address,pincode,country } = this.state;
    if(this.props.redirect){
        return (<div> 
          {this.props.history.push('/')}
        </div>);
      }
      return(
          <div className="list row container">
              <div className="col-sm-8 col-12 ">
                  <blockquote>
                      <table className="table table-borderless h4" style={{width:"800px"}}>
                        <tr>
                            <td className="font-weight-normal">Name</td>
                            <td className="font-weight-light">: {this.props.customer.name}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-normal">Mobile</td>
                            <td className="font-weight-light">: {this.props.customer.mobile}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-normal">EmailId</td>
                            <td className="font-weight-light">: {this.props.customer.email}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-normal">Address</td>
                            <td className="font-weight-light">: {this.props.customer.address+","+this.props.customer.pincode+","+this.props.customer.country}</td>
                        </tr>
                      </table>
                  </blockquote>
                </div>
                <div className="col-sm-4 col-12">
                    <div className="btn-group pull-right">
                        <Link className="btn btn-info" onClick ={this.close} >Update Profile</Link>
                        <Link className="btn btn-danger" onClick = {() => {if(window.confirm('Are you sure to Delete profile?')){this.deleteProfile(id)};}}>Delete Profile</Link>
                        <Link className="btn btn-info" onClick = {() =>{if(window.confirm('Are you sure to logout?')){this.logout(id)};}}>Logout</Link>
                    </div>
                </div>    
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Profile</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                     <table className='table table-borderless'>
                         <tr>
                             <td>Id</td>
                             <td><input className='form-control' type="text"  value={this.props.customer.id} readOnly /></td>
                         </tr>
                         <tr>
                            <td>Name</td>
                            <td><input className='form-control' type="text" value={name} onChange={this.onNameChange} /></td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td><input className='form-control' type="text" value={mobile} onChange={this.onMobileChange} /></td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td><input className='form-control' type="text" value={email} onChange={this.onEmailChange} /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input className='form-control' type="password" value={password} onChange={this.onPasswordChange} /></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><input className='form-control' type="text" value={address}  onChange={this.onAddressChange}/></td>
                        </tr>
                        <tr>
                            <td>PinCode</td>
                            <td><input className='form-control' type="text" value={pincode} onChange={this.onPinChange} /></td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td><input className='form-control' type="text" value={country} onChange={this.onCountryChange}/></td>
                        </tr>
                     </table>    
                    </ModalBody>
                    <Modal.Footer>
                      <Button variant="secondary" onClick= {this.close}>Close</Button>
                      <Button variant="primary" onClick={() =>this.updateProfile(id)}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
          </div>
      );
  }
}
export default connect(mapStateToProps,{loggedOut,getCustomer,updateCustomer,deleteCustomer})(MyProfile);
