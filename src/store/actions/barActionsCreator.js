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

export const addDrink = (data) => {
    return {
        type: actionTypes.ADD_DRINK,
        price: data.price,
        name: data.name
    };
};

export const removeDrink = (data) => {
    return {
        type: actionTypes.REMOVE_DRINK,
        price: data.price,
        name: data.name
    };
};

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