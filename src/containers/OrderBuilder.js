import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as actionTypes from '../store/actions';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';


class OrderBuilder extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render () {
        return (
            <div>
                hello
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        bvgs: state.beverages,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onBeverageAdded: (ingName) => dispatch({type: actionTypes.ADD_BEVERAGE, ingredientName: ingName}),
        onBeverageRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_BEVERAGE, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( OrderBuilder, axios ));
