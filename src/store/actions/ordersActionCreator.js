import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    }
};

const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        id: id,
        orderData: orderData
    }
};

const purchaseOrderFail = () => {

};

const fetchOrdersStart = () => {

};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

const fetchOrdersFail = () => {

};


export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseOrderSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseOrderFail());
            });
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('https://react-coffee-bar.firebaseio.com/orders.json')
            .then(response => {
                dispatch(fetchOrdersSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchOrdersFail());
            });
    };
};