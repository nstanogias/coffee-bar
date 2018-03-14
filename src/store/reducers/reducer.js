import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    menu: null,
    totalPrice: 0,
    error: false
}

const setMenu = (state, action) => {
    return updateObject( state, {
        menu: action.menu
    } );
}

const fetchMenuFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const addBeverage = (state, action) => {
    return updateObject( state, {totalPrice: state.totalPrice + action.price} );
}

const removeBeverage = (state, action) => {
    return updateObject( state, {totalPrice: state.totalPrice - action.price} );
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_MENU: return setMenu(state, action);
        case actionTypes.FETCH_MENU_FAILED: return fetchMenuFailed(state, action);
        case actionTypes.ADD_BEVERAGE: return addBeverage(state, action);
        case actionTypes.REMOVE_BEVERAGE: return removeBeverage(state, action);
        default: return state;
    }
};

export default reducer;