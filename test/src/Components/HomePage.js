import React, { Component } from "react";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index
    };
  }

  addItem = () => {
    this.props.add(this.state.index);
  };

  removeItem = () => {
    this.props.remove(this.state.index);
  };

  addToCart = () => {
    this.props.addCart(this.state.index);
  };

  render() {
    return (
      <div className="homepage">
        {this.props.img}
        <h2 style={{textAlign:'center'}}>{this.props.name}</h2>
        <h2 style={{textAlign:'center'}}>{this.props.price}$</h2>
        <div className="additionButtons">
          <button
            style={{
              height: "20px",
              width: "30px",
              fontSize: "20px",
              backgroundColor: "lightgreen"
            }}
            onClick={this.removeItem}
          >
            -
          </button>
          <span style={{ fontSize: "20px" }}>{this.props.amount}</span>
          <button
            style={{
              height: "20px",
              width: "30px",
              fontSize: "20px",
              backgroundColor: "lightgreen"
            }}
            onClick={this.addItem}
          >
            +
          </button>
          <button onClick={this.addToCart}>Add to cart</button>
        </div>
      </div>
    );
  }
}
