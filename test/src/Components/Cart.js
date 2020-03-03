import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      amount: props.amount
    };
  }

  

  removeFromCart = () => {
    this.props.removeCart(this.state.index);
  };

  render() {
    return (
      <div>
        <div className="cartItems">
          {this.props.img}
          <h2>{this.props.name}</h2>
          <h2>{this.props.price}$</h2>
          <h2>{this.state.amount}</h2>
          <h2>{this.props.price * this.state.amount}$</h2>
          <button onClick={this.removeFromCart}>Remove Item</button>
        </div>
      </div>
    );
  }
}
