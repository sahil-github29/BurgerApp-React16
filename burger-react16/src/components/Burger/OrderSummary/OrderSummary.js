import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("[OrderSummary] willupdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey, id) => {
        return (
          <li key={igKey + id}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <div>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>{ingredientSummary}</ul>
          <p>
            <strong>Total Price : {this.props.price.toFixed(2)}</strong>
          </p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
            CANCEL
          </Button>
          <Button btnType="Success" clicked={this.props.purchaseContinued}>
            CONTINUE
          </Button>
        </div>
      </Aux>
    );
  }
}

export default OrderSummary;
