import axios from "axios";

//PUBLIC API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//create order
const createOrderService = async (order, token) => {
    const {data} = await axios.post(`${API_BASE_URL}/api/orders`, order, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get all orders
const getAllOrdersService= async(token) =>{
    const {data} = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get order by id
const getOrderByIdService = async(id, token) =>{
    const {data} = await axios.get(`${API_BASE_URL}/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
}

//delete order by id
const deleteOrderByIdService = async (id, token) => {
    const {data} = await axios.delete(`${API_BASE_URL}/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};

export {createOrderService, getAllOrdersService, getOrderByIdService, deleteOrderByIdService};