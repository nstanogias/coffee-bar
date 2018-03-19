import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    menu: null,
    totalPrice: 0,
    error: false,
    order: null
}

const setMenu = (state, action) => {
    return updateObject( state, {
        menu: action.menu
    } );
}

const fetchMenuFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const addDrink = (state, action) => {
    let updatedOrder;
    if(state.order === null) {
        updatedOrder = { [action.name]: 1};
    } else {
        updatedOrder = { [action.name]: state.order.hasOwnProperty(action.name) ? state.order[action.name] + 1 : 1};
    }
    const updated = updateObject(state.order, updatedOrder);
    console.log(state.order);
    return updateObject( state, {
        totalPrice: state.totalPrice + action.price,
        order: updated
    } );
}

const removeDrink = (state, action) => {
    return updateObject( state, {totalPrice: state.totalPrice - action.price} );
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_MENU: return setMenu(state, action);
        case actionTypes.FETCH_MENU_FAILED: return fetchMenuFailed(state, action);
        case actionTypes.ADD_DRINK: return addDrink(state, action);
        case actionTypes.REMOVE_DRINK: return removeDrink(state, action);
        default: return state;
    }
};

export default reducer;