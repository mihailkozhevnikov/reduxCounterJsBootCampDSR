import React from 'react';
import './index.css';
import { render } from "react-dom";
import { createStore, bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";


//Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//Action Creators
const increment = function() {
  return {
    type: INCREMENT,
    amount: 1
  };
};

const decrement = function() {
  return {
    type: DECREMENT,
    amount: 1
  };
};

const initialState = 0;

//Reducers
const countReducer = function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.amount;
    case DECREMENT:
      return state - action.amount;
    default:
      return state;
  }
};

//React App
const counterStore = createStore(countReducer,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let App = props => {
  const handleIncrement = () => {
    props.increment();
  };

  const handleDecrement = () => {
    props.decrement();
  };

  return (
    <div>
      <div>Count: {props.count}</div>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    count: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      increment,
      decrement
    },
    dispatch
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={counterStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);



