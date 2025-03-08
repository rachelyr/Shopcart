import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/ProductApi';
import {ErrorAction} from '../Screens/Protection';
// import { Types } from 'mongoose';


//get all products action
export const getAllProductsAction = ({pageNumber, category, search, sort, tag}) => async (dispatch) => {
    try{
        dispatch({type:Types.PRODUCT_LIST_REQUEST});
        const data = await Apis.getAllProducts({
            pageNumber,
            category,
            search,
            sort,
            tag
        });
        dispatch({ type: Types.PRODUCT_LIST_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.PRODUCT_LIST_FAIL);
    }
};


//get single product action
export const getSingleProductAction = (id) => async (dispatch) => {
    try{
        dispatch({type:Types.GET_PRODUCT_REQUEST});
        const data = await Apis.getSingleProduct(id);
        dispatch({ type: Types.GET_PRODUCT_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.GET_PRODUCT_FAIL);
    }
};


//get all the popular products
export const getAllPopularProductsAction = () => async (dispatch) => {
    try{
        const data = await Apis.getAllPopularProd();
        dispatch({type: Types.TAGS_PRODUCT, payload: data});
    } catch(error){
        ErrorAction(error, dispatch, Types.TAGS_PRODUCTS_FAIL);
    }
};

//add a product to cart
export const addToCartAction = (product) => async (dispatch) => {
    //save product to local storage
    var prod= JSON.parse(localStorage.getItem('cart') || "[]");
    const cartitem= prod.findIndex(item => item._id === product._id);
    if(cartitem >= 0){
        prod[cartitem].quantity+= product.quantity;
    } else{
        prod.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(prod));
    dispatch({type: Types.CART_ADD_ITEM, payload: product});
}

//update a product
export const updateCartAction = (id, quantity) => async (dispatch) => {
    var prod= JSON.parse(localStorage.getItem('cart') || "[]");
    const updatedCart = prod.map(item => {
        if(item._id === id){
            return {...item, quantity: quantity};
        }
        return item;
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch({type: Types.CART_UPDATE_ITEM, payload: {id, quantity}})
}

//remove a product to cart
export const removeFromCartAction = (id) => async (dispatch) => {
    //save product to local storage
    var prod= JSON.parse(localStorage.getItem('cart') || "[]");
    prod = prod.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(prod));
    dispatch({type: Types.CART_REMOVE_ITEM, payload: id});
};

//reset cart
export const resetCartAction = () => async (dispatch) => {
    localStorage.removeItem('cart');
    dispatch({type: Types.CART_RESET});
};