import React, {Component} from 'react';
import Aux from '../../hoc/Aux';

class OrderSummary extends Component {

    render() {

        const orderSummary = Object.keys(this.props.items)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.items[igKey]}
                    </li>);
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <ul>
                    {orderSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
            </Aux>
        );
    }
}

export default OrderSummary;