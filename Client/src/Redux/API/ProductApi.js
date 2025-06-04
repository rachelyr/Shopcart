import axios from "axios";

//PUBLIC API

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAllProducts = async ({pageNumber, category, search, sort, tag}) => {
    // Using template literals but ensuring values aren't undefined
    pageNumber = Number(pageNumber) || 1;
    category = category || '';
    search = search || '';
    sort = sort || '';
    tag = tag || '';

    const {data} = await axios.get(
        `${API_BASE_URL}/api/products?pageNumber=${pageNumber}&category=${category}&search=${search}&sort=${sort}&tag=${tag}`
    );
    return data;
};

//get a single product
const getSingleProduct = async (id) =>{
    const {data} = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    return data;
};

//get all popular products
const getAllPopularProd = async () => {
    const {data} = await axios.get(`${API_BASE_URL}/api/products/all/tags`);
    return data;
};

export {getAllProducts, getSingleProduct, getAllPopularProd};