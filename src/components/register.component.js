import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import {Button} from "react-bootstrap";
export default class Login extends Component {
    constructor(props) {
      super(props);
      this.register = this.register.bind(this);
      this.onNameChange = this.onNameChange.bind(this);
      this.onMobileChange = this.onMobileChange.bind(this);
      this.onEmailChange = this.onEmailChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.onAddressChange = this.onAddressChange.bind(this);
      this.onPinChange = this.onPinChange.bind(this);
      this.onCountryChange = this.onCountryChange.bind(this);  
      this.state = { 
        name:"",
        mobile:"",
        email:"",
        password:"",
        address:"",
        pincode:"",
        country:"",
        content: ""
      };
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
    register(){
        var data ={
            name :this.state.name,
            mobile: this.state.mobile,
            email:this.state.email,
            password: this.state.password,
            address: this.state.address,
            pincode: this.state.pincode,
            country:this.state.country
        };
        CustomerDataService.register(data)
        .then(response=>{
            this.props.history.push('/');
        })
        .catch(e=>{
            this.setState({
                content: e
            })
        })
    }
    render(){
        const {content} = this.state;
        return(
            <div >
                <header className='jumbotron' style={{backgroundColor:"#006080"}} >
                 <div className='row'>
                     <div className="col-sm-8 col-12">
                        <h1 style={{color:"white"}}> SINDRA Shopping..!! </h1>
                     </div>
                 </div>
                </header>
                <div className="container" style={{width:'500px'}}>
                    <h2>Register here</h2>
                    <table className='table table-borderless'>
                        <tr>
                           <td>Name</td>
                           <td><input className='form-control' type="text" onChange={this.onNameChange} /></td>
                       </tr>
                       <tr>
                           <td>Mobile</td>
                           <td><input className='form-control' type="text" onChange={this.onMobileChange} /></td>
                       </tr>
                       <tr>
                           <td>Email Id</td>
                           <td><input className='form-control' type="text"   onChange={this.onEmailChange} /></td>
                       </tr>
                       <tr>
                           <td>Password</td>
                           <td><input className='form-control' type="password"  onChange={this.onPasswordChange} /></td>
                       </tr>
                       <tr>
                           <td>Address</td>
                           <td><input className='form-control' type="text"  onChange={this.onAddressChange}/></td>
                       </tr>
                       <tr>
                           <td>PinCode</td>
                           <td><input className='form-control' type="text"  onChange={this.onPinChange} /></td>
                       </tr>
                       <tr>
                           <td>Country</td>
                           <td><input className='form-control' type="text" onChange={this.onCountryChange}/></td>
                       </tr>
                       <tr>
                           <td></td>
                           <td>
                                <Button className="btn btn-info" onClick={this.register}>Register</Button>
                           </td>
                       </tr>
                    </table>    
                    <span className="h3">{content}</span>
                </div>
                <footer style={{bottom:"0",textAlign:"center",width:'100%'}}>
                    <hr />
                    <p>copyright &copy; 2021</p>
                </footer>
            </div>

        )
    }
}