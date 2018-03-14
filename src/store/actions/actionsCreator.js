import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setMenu = ( menu ) => {
    return {
        type: actionTypes.SET_MENU,
        menu: menu
    };
};

export const fetchMenuFailed = () => {
    return {
        type: actionTypes.FETCH_MENU_FAILED
    };
};

export const addBeverage = (price) => {
    return {
        type: actionTypes.ADD_BEVERAGE,
        price: price
    };
}

export const removeBeverage = (price) => {
    return {
        type: actionTypes.REMOVE_BEVERAGE,
        price: price
    };
}

export const initBar = () => {
    return dispatch => {
        axios.get( 'https://react-coffee-bar.firebaseio.com/menu.json' )
            .then( response => {
                dispatch(setMenu(response.data));
            } )
            .catch( error => {
                dispatch(fetchMenuFailed());
            } );
    };
};