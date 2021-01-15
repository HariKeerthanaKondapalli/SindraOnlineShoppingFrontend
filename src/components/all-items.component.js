import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import {getAllItems,getCurrentItemDetails} from '../actions/items.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ItemDetails from "./item-details.component";
import Item from "./item.component";

const mapStateToProps = state => ({  
  redirect: state.redirect.redirect,
  items: state.itemsReducer.items,
  length: state.itemsReducer.length,
  state: state,
});  

class AllItems extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.searchItem= this.searchItem.bind(this);
    this.state = {
      items:[],
      currentItem: null,
      currentIndex: -1,
      currentImage: null,
      searchTitle: "",
    };
  }

  static propTypes = {  
    getAllItems: PropTypes.func.isRequired,
    getCurrentItemDetails : PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllItems();
    console.log(this.props.state);
    this.setState({
      items: this.props.items,
    })
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    if(searchTitle == ""){
      this.retrieveItems();
    }
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.props.getAllItems();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }
  setActiveItem(item, index) {
    console.log(this.props.state);
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
  searchItem() {
    if(this.state.searchTitle != ""){
    ItemDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    else{
      this.retrieveItems();
    }
  }
  render() {
    const { searchTitle,currentIndex} = this.state;
    if(this.props.redirect){
      return (<div> 
        {this.props.history.push('/')}
      </div>);
    }
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {this.props.items &&
              this.props.items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  <Item id={item.id}/>   
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
              <ItemDetails/>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps,{getAllItems,getCurrentItemDetails})(AllItems);