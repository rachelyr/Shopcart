import axios from "axios";

//PUBLIC API

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAllCategories =  async () =>{
    const {data} = await axios.get(`${API_BASE_URL}/api/categories`);
    return data;
}

export {getAllCategories};