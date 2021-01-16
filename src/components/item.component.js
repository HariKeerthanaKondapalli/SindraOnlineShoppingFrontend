import React, { Component } from "react";
import {connect} from 'react-redux';

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  state: state,
  items: state.itemsReducer.items,
});  

class Item extends Component {
  constructor(props) {
    super(props);
  }

componentDidMount() {
    console.log("item index",this.props.id);
  }

  render() {
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
    var currentItem;
    this.props.items.map((item,index)=>{
      if(item.id === this.props.id){
        currentItem = item;
      }
    });
    return (
        <div>
            <img style={{width:150,height:150}} src={"data:image/jpeg;base64," + new Buffer( currentItem.photo.data, 'binary' ).toString('base64')} />
            <br/>
            {currentItem.name}
        </div>
    );
  }
}
export default connect(mapStateToProps)(Item);