import * as actionTypes from './actions';

const initialState = {
    beverages: {
        coke: 0,
        fanta: 0,
        soda: 0
    },
    totalPrice: 0
};

const BEVERAGE_PRICES = {
    coke: 3,
    fanta: 3,
    soda: 3
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_BEVERAGE:
            return {
                ...state,
                beverages: {
                    ...state.beverages,
                    [action.beverageName]: state.beverages[action.beverageName] + 1
                },
                totalPrice: state.totalPrice + BEVERAGE_PRICES[action.beverageName]
            };
        case actionTypes.REMOVE_BEVERAGE:
            return {
                ...state,
                beverages: {
                    ...state.beverages,
                    [action.beverageName]: state.beverages[action.beverageName] - 1
                },
                totalPrice: state.totalPrice - BEVERAGE_PRICES[action.beverageName]
            };
        default:
            return state;
    }
};

export default reducer;