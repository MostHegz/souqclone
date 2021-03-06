import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants"

export const createOrder =(order) => async (dispatch ,getState) =>{
    dispatch({type: CREATE_ORDER_REQUEST, payload: order});
    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.post('/api/orders', order,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ 
            type: CREATE_ORDER_FAIL,
            payload: 
                error.response && error.respnse.data.message
                    ? error.response.data.message
                    : error.message,
})
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) =>{
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.get(`/api/orders/${orderId}`,{
            headers: {Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = 
            error.response && error.respnse.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload:message});
        }
};

export const listOrders = () => async (dispatch, getState) =>{
    dispatch({type: ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.get('/api/orders/history',{
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = 
            error.response && error.respnse.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: ORDER_LIST_FAIL, payload: message});
    }
}