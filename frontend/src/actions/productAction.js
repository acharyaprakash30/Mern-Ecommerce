import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS} from '../constants/productConstants';

export const getProducts = (currentPage=1,limit) => async (dispatch) => {
    dispatch({type:ALL_PRODUCT_REQUEST});
    try{
        let link= `/api/v1/products?page=${currentPage}`
        const res = await axios.get(link);
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:res.data});
    }catch(err){
        dispatch({type:ALL_PRODUCT_FAIL,payload:err.response.data.message});
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    dispatch({type:PRODUCT_DETAILS_REQUEST});
    try{
        const res = await axios.get(`/api/v1/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:res.data});
    }catch(err){
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:err.response.data.message});
    }
}


export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}

