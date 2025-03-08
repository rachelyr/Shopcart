import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/OrderApi';
import {ErrorAction, tokenProtection} from '../Screens/Protection';
import toast from 'react-hot-toast';

//create order action
export const createOrderAction = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: Types.ORDER_CREATE_REQUEST});
        const data = await Apis.createOrderService(
            order,
            tokenProtection(getState)
        );
        dispatch({type: Types.ORDER_CREATE_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.ORDER_CREATE_FAIL);
    }
};

//get all orders action
export const getAllOrdersAction = () => async (dispatch, getState) => {
    try{
        dispatch({ type: Types.ORDER_GET_ALL_REQUEST});
        const data = await Apis.getAllOrdersService(tokenProtection(getState));
        dispatch({ type: Types.ORDER_GET_ALL_SUCCESS, payload: data})
    } catch(error){
        ErrorAction(error, dispatch, Types.ORDER_GET_ALL_FAIL);
    }
};

//get order by id action
export const getOrderByIdAction= (id) => async (dispatch,  getState) => {
    try{
        dispatch({type: Types.ORDER_GET_BY_ID_REQUEST});
        const data = await Apis.getOrderByIdService(
            id, tokenProtection(getState)
        );
        dispatch({type: Types.ORDER_GET_BY_ID_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.ORDER_GET_BY_ID_FAIL);
    }
}

//delete order by id
export const deleteOrderAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: Types.ORDER_DELETE});
        await Apis.deleteOrderByIdService(id, tokenProtection(getState));
        toast.success('Order deleted!');
        //get all orders again
        const data = await Apis.getAllOrdersService(tokenProtection(getState));
        dispatch({type: Types.ORDER_GET_ALL_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.ORDER_DELETE_FAIL);
    }
};