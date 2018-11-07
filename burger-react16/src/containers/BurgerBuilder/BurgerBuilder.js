import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 0.5,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false, // it will be false when ORDER NOW button is clicked
    loading: false
  };

  /* Disable or Enable Order button based on ingredients */
  updatePerchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
    console.log("sum: " + sum);
  }

  addIngredientHandler = type => {
    // get the old ingredient type count like salad or meat
    const oldCount = this.state.ingredients[type];
    // calculate the updated count
    const updatedCount = oldCount + 1;

    // Note:State should be updated in an immutable way so
    // creating a copy, change it, and then update the original state obj.
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // update the ingredient
    updatedIngredients[type] = updatedCount;

    // total prices with ingredients
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    // update ingredient state
    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredients
      },
      () => {
        this.updatePerchaseState();
      }
    );
  };
  removeIngredientHandler = type => {
    // get the old ingredient type count like salad or meat
    const oldCount = this.state.ingredients[type];

    // if no ingredient added, return null;
    if (oldCount <= 0) {
      return;
    }

    // calculate the updated count
    const updatedCount = oldCount - 1;

    // Note:State should be updated in an immutable way so
    // creating a copy, change it, and then update the original state obj.
    const updatedIngredient = {
      ...this.state.ingredients
    };
    // update the ingredient
    updatedIngredient[type] = updatedCount;

    // total prices with ingredients
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    // update ingredient state
    this.setState(
      {
        totalPrice: newPrice,
        ingredients: updatedIngredient
      },
      () => {
        this.updatePerchaseState();
      }
    );
  };

  // Calls on clicking ORDER NOW button
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  // it will set backdrop and Modek disabled
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //
  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const queryParams = [];

    for (const i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    // making a new copy of state ingredient obj
    const disableInfo = {
      ...this.state.ingredients
    };

    // setting true or false for buttton based on ingredient
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    var orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
