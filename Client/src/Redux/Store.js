import {combineReducers, configureStore} from '@reduxjs/toolkit';
import * as user from './Reducers/UserReducer';
import * as cat from './Reducers/CatergoryRed';
import * as prod from './Reducers/ProductRed';
import * as order from './Reducers/OrderReducer';

const rootReducer = combineReducers({
    //user reducers
    userLogin: user.LoginReducer,
    userRegister: user.RegisterReducer,
    userProfileUpdate: user.UpdateProfileReducer,
    userChangePassword: user.ChangePasswordReducer,
    deleteUserAccount: user.deleteAccountReducer,
    //category reducers
    categoriesList: cat.getCategories,
    //product reducers
    productList: prod.ProductListRed,
    singleProduct: prod.SingleProductRed,
    tagsProduct: prod.TagsProductRed,
    //cart: reducers
    cart: prod.CartReducer,
    //order: reducers
    createOrder: order.createOrderReducer,
    getAllOrders: order.getAllOrdersReducer,
    getOrderById: order.getOrderByIdReducer,
    deleteOrder: order.deleteOrderReducer,
});

//get user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

//get cart items from local storage
const cartItemsFromStorage = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: [];

// const cartItems= Array.isArray(cartItemsFromStorage) ? cartItemsFromStorage : [];

const inititalState= {
    //user state
    userLogin: {userInfo: userInfoFromStorage},
    cart: {cartItems: cartItemsFromStorage},
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: inititalState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})