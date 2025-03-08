import * as Types from '../Constants/AllConstants';

//create order reducer
export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.ORDER_CREATE_REQUEST:
            return { loading: true };
        case Types.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case Types.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case Types.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

//get all orders reducer
const initialState = {
    orders: [],
};

export const getAllOrdersReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.ORDER_GET_ALL_REQUEST:
            return {loading: true};
        case Types.ORDER_GET_ALL_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                total: action.payload.total,
                pending: action.payload.pending,
                completed: action.payload.completed,
                cancelled: action.payload.cancelled
            };
        case Types.ORDER_GET_ALL_FAIL:
            return {loading: false, error: action.payload};
        case Types.ORDER_GET_ALL_RESET:
            return {orders: []};
        default:
            return state;
    }
};

//get order by id reducer
export const getOrderByIdReducer = (state = initialState, action) => {
    switch(action.type){
        case Types.ORDER_GET_BY_ID_REQUEST:
            return {loading: true};
        case Types.ORDER_GET_BY_ID_SUCCESS:
            return {loading: false, order: action.payload};
        case Types.ORDER_GET_BY_ID_FAIL:
            return { loading: false, error: action.payload};
        case Types.ORDER_GET_BY_ID_RESET:
            return {order: {}};
        default:
            return state;
    }
};

//delete order reducer
export const deleteOrderReducer = (state = {success: false, error: null}, action) => {
    switch (action.type) {
        case Types.ORDER_DELETE:
            return {success: true};
        case Types.ORDER_DELETE_FAIL:
            return {success: false, error: action.payload};
        case Types.ORDER_DELETE_RESET:
            return {success: false};
        default:
            return state;
    }
};