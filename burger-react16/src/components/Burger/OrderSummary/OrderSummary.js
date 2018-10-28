import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey, id) => {
    return (
      <li key={igKey + id}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </Aux>
  );
};

export default orderSummary;
