import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

import './index.css';
import App from './App';
import Login from "./components/login.component";
import Register from "./components/register.component";
import reportWebVitals from './reportWebVitals';
// import {getCustomer} from './actions/customer.actions';

const store = createStore(rootReducer, applyMiddleware(thunk)); 
console.log("In:",store.getState());
ReactDOM.render(
  <HashRouter>
    <div>
    <Provider store={store}>
      <Switch>
        <Route path='/customer'>
            <App />
        </Route>
        <Route path='/register' component={Register} />
        <Route path='/' component={Login} />
      </Switch>
      </Provider>
    </div>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
