import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/CategoryApi';
import {ErrorAction, tokenProtection} from '../Screens/Protection';


//get all categories action
export const getCategoriesAction = () => async (disptach) => {
    try{
        disptach({type: Types.CATEGORIES_LIST_REQUEST});
        const data = await Apis.getAllCategories();
        disptach({type: Types.CATEGORIES_LIST_SUCCESS, payload: data});
    } catch(error){
        ErrorAction(error, disptach, Types.CATEGORIES_LIST_FAIL);
    }
};