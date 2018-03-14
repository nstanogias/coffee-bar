import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    beverages: null,
    totalPrice: 0,
    error: false
}

const setBeverages = (state, action) => {
    return updateObject( state, {
        beverages: action.beverages,
        totalPrice: 0,
        error: false
    } );
}

const fetchBeveragesFailed = (state, action) => {
    return updateObject( state, { error: true } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_BEVERAGES: return setBeverages(state, action);
        case actionTypes.FETCH_BEVERAGES_FAILED: return fetchBeveragesFailed(state, action);
        default: return state;
    }
};

export default reducer;