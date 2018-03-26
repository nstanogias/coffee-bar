import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
};

const purchaseOrderStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const purchaseOrderSuccess = (state, action) => {
    return updateObject(state, {loading: false});
}

const purchaseOrderFail = (state, action) => {
    return updateObject(state, {error: action.error});
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false});
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_ORDER_START: return purchaseOrderStart(state, action);
        case actionTypes.PURCHASE_ORDER_SUCCESS: return purchaseOrderSuccess(state, action);
        case actionTypes.PURCHASE_ORDER_FAIL: return purchaseOrderFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default ordersReducer;