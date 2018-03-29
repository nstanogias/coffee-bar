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

const purchaseOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        error
    }
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};


export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseOrderSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseOrderFail(error));
            });
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                // console.log(response);
                const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
                console.log("orders are", fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};