import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setBeverages = ( beverages ) => {
    return {
        type: actionTypes.SET_BEVERAGES,
        beverages: beverages
    };
};

export const fetchBeveragesFailed = () => {
    return {
        type: actionTypes.FETCH_BEVERAGES_FAILED
    };
};

export const initBar = () => {
    return dispatch => {
        axios.get( 'https://react-coffee-bar.firebaseio.com/Beverages.json' )
            .then( response => {
                dispatch(setBeverages(response.data));
            } )
            .catch( error => {
                dispatch(fetchBeveragesFailed());
            } );
    };
};