import axios from "axios";

//PUBLIC API
//create order
const createOrderService = async (order, token) => {
    const {data} = await axios.post('http://localhost:5000/api/orders', order, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get all orders
const getAllOrdersService= async(token) =>{
    const {data} = await axios.get(`http://localhost:5000/api/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get order by id
const getOrderByIdService = async(id, token) =>{
    const {data} = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
}

//delete order by id
const deleteOrderByIdService = async (id, token) => {
    const {data} = await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};

export {createOrderService, getAllOrdersService, getOrderByIdService, deleteOrderByIdService};