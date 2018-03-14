import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import { Button } from 'antd';

class OrderSummary extends Component {

    render () {
        return (
          <Aux>
              <h3>Your Order</h3>

              <p><strong>Total Price: {this.props.price.toFixed( 2 )}</strong></p>
              <p>Continue to Checkout?</p>
              <Button type="danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
              <Button type="primary" clicked={this.props.purchaseContinued}>CONTINUE</Button>
          </Aux>
        );
    }
}

export default OrderSummary;