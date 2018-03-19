import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
};

export default ordersReducer;