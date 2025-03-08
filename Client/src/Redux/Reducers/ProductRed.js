import * as Types from '../Constants/AllConstants';

const initialState = {
    loading: false,
    offers: [],
    error: null,
    products: [],
};


//get all products
export const ProductListRed = (state = initialState, action) => {
    switch (action.type) {
        case Types.PRODUCT_LIST_REQUEST:
            return {loading: true};
        case Types.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
                offers: action.payload.products.filter((p) => p.salesOffer?.status),
            };
        case Types.PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        case Types.PRODUCT_LIST_RESET:
            return {products: [], offers: []};
        default:
            return state;
    }
};

//get single product
export const SingleProductRed = (state = {product: {}, related: []}, action) => {
    switch (action.type) {
        case Types.GET_PRODUCT_REQUEST:
            return {loading: true, product: {}};
        case Types.GET_PRODUCT_SUCCESS:
            return {loading: false,
                product: action.payload.product,
                related: action.payload.relatedProducts};
        case Types.GET_PRODUCT_FAIL:
            return {loading: false, error: action.payload};
        case Types.GET_PRODUCT_RESET:
            return {product: {}, realted: []};
        default:
            return state;
    };
};

//get all popular tags
const popState = {
    tags: [],
    error: false,
    loading: false
}

export const TagsProductRed= (state = popState, action) => {
    switch (action.type) {
        case Types.TAGS_PRODUCT:
            return {tags: action.payload};
        case Types.TAGS_PRODUCTS_FAIL:
            return {error: action.payload};
        case Types.TAGS_PRODUCTS_RESET:
            return {tags: []};
        default:
            return state;
    };
};

const cartState= {
    cartItems: [],
};

//cart reducer
export const CartReducer = (state = cartState, action) => {
    switch(action.type) {
        case Types.CART_ADD_ITEM:
            const itemIndx= state.cartItems.findIndex(item => item._id === action.payload._id);

            if(itemIndx >= 0){
                const updatedItems= [...state.cartItems];
                updatedItems[itemIndx]= {
                    ...updatedItems[itemIndx],
                    quantity: updatedItems[itemIndx].quantity + action.payload.quantity
                }

                return {
                    ...state,
                    cartItems: updatedItems
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                };
            }
        case Types.CART_UPDATE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };
        case Types.CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x._id !== action.payload),
            };
        case Types.CART_RESET:
            return {cartItems: []};
        default:
            return state;
    }
};