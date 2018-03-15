import React, {Component} from 'react';
import Aux from '../../hoc/Aux';

class OrderSummary extends Component {

    render () {
        return (
          <Aux>
              <h3>Your Order</h3>

              <p><strong>Total Price: {this.props.price.toFixed( 2 )}</strong></p>
              <p>Continue to Checkout?</p>
          </Aux>
        );
    }
}

export default OrderSummary;