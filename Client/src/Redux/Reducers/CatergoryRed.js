import * as Types from '../Constants/AllConstants';

const initialState = {
    loading: false,
    error: null,
    categories: [],
};

//get all categories
export const getCategories = (state=initialState, action) =>{
     switch(action.type){
        case Types.CATEGORIES_LIST_REQUEST:
            return {loading: true};
        case Types.CATEGORIES_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case Types.CATEGORIES_LIST_FAIL:
            return {loading: false, error: action.payload};
        case Types.CATEGORIES_LIST_RESET:
            return {};
        default:
            return state;
     };
};