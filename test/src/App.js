import React, { Component } from "react";
import "./App.css";
import Cart from "./Components/Cart";
import HomePage from "./Components/HomePage";
import banana from "./banana.jpg";
import apple from "./apple.jpeg";
import orange from "./orange.jpg";

export default class App extends Component {
  state = {
    flag: true,
    fruit: [
      {
        name: "Banana",
        price: 1,
        counter: 0,
        image: (
          <img
            src={banana}
            alt="banana"
            style={{
              width: "70px",
              height: "50px",
              marginTop: "5px",
              marginLeft: "5px"
            }}
          />
        )
      },
      {
        name: "Apple",
        price: 2,
        counter: 0,
        image: (
          <img
            src={apple}
            alt="apple"
            style={{
              width: "70px",
              height: "60px",
              marginTop: "5px",
              marginLeft: "5px"
            }}
          />
        )
      },
      {
        name: "Orange",
        price: 3,
        counter: 0,
        image: (
          <img
            src={orange}
            alt="orange"
            style={{
              width: "90px",
              height: "60px",
              marginTop: "5px"
            }}
          />
        )
      }
    ],
    cart: [],
    totalFinal: 0
  };

  addItem = i => {
    this.updateItem(i, 1);
  };

  removeItem = i => {
    if (this.state.fruit[i].counter === 0) return;
    this.updateItem(i, -1);
  };

  updateItem = (i, n = 0) => {
    this.setState(oldState => {
      let newState = { ...oldState };
      if (n === 0) {
        newState.fruit[i].counter = 0;
      } else {
        newState.fruit[i].counter += n;
      }
      return newState;
    });
  };

  addToCart = i => {
    if (this.state.fruit[i].counter === 0) return;
    const temp = { ...this.state.fruit[i] };
    this.setState(oldState => {
      let newState = { ...oldState };
      newState.cart = [...this.state.cart, temp];
      return newState;
    });
    this.updateItem(i);
    this.setState(oldTotal => {
      let newTotal = { ...oldTotal };
      newTotal.totalFinal += temp.counter * temp.price;
      return newTotal;
    });
  };

  removeFromCart = i => {
    const temp = this.state.cart.filter((item, index) => i !== index);
    this.setState(oldTotal => {
      let newTotal = { ...oldTotal };
      newTotal.totalFinal -=
        this.state.cart[i].counter * this.state.cart[i].price;
      return newTotal;
    });
    this.setState({ cart: [...temp] });
  };

  // calcTotalCost = () => {
  //   const total = this.state.cart.map(item => {
  //     return item.price * item.counter;
  //   });
  //   const totalFinal = total.reduce((acc, current) => {
  //     return acc + current;
  //   }, 0);
  //   this.setState({totalFinal:totalFinal})
  //   console.log(this.state.totalFinal);

  // };

  finishPurchase = () => {
    if (this.state.totalFinal === 0) return alert("Your cart is empty");
    const finished = this.state.cart.map(item => {
      return item.name;
    });
    this.setState({ cart: [] });
    this.setState({ totalFinal: 0 });
    alert(
      `Thanks for purchasing! your items are ${finished} your total amount paid is ${this.state.totalFinal}$`
    );
  };

  showPage = () => {
    if (this.state.flag) {
      return (
        <div>
          {this.state.fruit.map((fruit, index) => {
            return (
              <HomePage
                img={fruit.image}
                index={index}
                add={this.addItem}
                remove={this.removeItem}
                addCart={this.addToCart}
                amount={fruit.counter}
                name={fruit.name}
                price={fruit.price}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {this.state.cart.map((item, index) => {
            return (
              <Cart
                img={item.image}
                index={index}
                removeCart={this.removeFromCart}
                name={item.name}
                price={item.price}
                amount={item.counter}
                calc={this.calcTotalCost}
              />
            );
          })}
          <div
            className="checkout"
            style={{ backgroundColor: "rgb(106, 199, 230)" }}
          >
            <h2 style={{ textAlign: "center", color: "orangered" }}>
              {this.state.totalFinal}$
            </h2>
            <button onClick={this.finishPurchase}>Finish Purchase</button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="AppOwner">
        <div className="App">
          <div className="navButtons">
            <button
              onClick={() => {
                this.setState({ flag: true });
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                this.setState({ flag: false });
              }}
            >
              Cart
            </button>
          </div>
          {this.showPage()}
        </div>
      </div>
    );
  }
}
