import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/UserApi';
import {toast} from 'react-hot-toast';
import { ErrorAction, tokenProtection } from '../Screens/Protection';


//login user action

const loginAction = (user) => async (dispatch) => {
    try{
        dispatch({type: Types.USER_LOGIN_REQUEST});
        const data= await Apis.loginService(user);
        dispatch ({type: Types.USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        ErrorAction(error, dispatch, Types.USER_LOGIN_FAILED); //ERRORAction used from the Production file
    }
}


//logout user action
const logoutAction = () => async (dispatch) => {
    try{
        dispatch({type: Types.USER_LOGOUT});
        dispatch({type: Types.USER_LOGIN_RESET});
        dispatch({type: Types.USER_REGISTER_RESET});
        dispatch({type: Types.PROFILE_UPDATE_RESET});
        dispatch({type: Types.PASSWORD_UPDATE_RESET});
        dispatch({type: Types.USER_DELETE_RESET});
        await Apis.logoutService();
    } catch{
        toast.error('Logout failed');
    }
};


//register user action
const registerAction = (user) => async (dispatch) => {
    try{
        dispatch({type: Types.USER_REGISTER_REQUEST});
        const data = await Apis.registerService(user);
        dispatch({type:  Types.USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: Types.USER_LOGIN_SUCCESS, payload: data});
        toast.success(`Welcome to Shopcart ${data.fullName}`);
    } catch (error) {
        ErrorAction(error, dispatch, Types.USER_REGISTER_FAILED);
    }
};


//update user profile action

const updateProfileAction= (user) => async (dispatch, getState) =>{
    try{
        dispatch({type: Types.PROFILE_UPDATE_REQUEST});

        const data = await Apis.updateProfileService(user, tokenProtection(getState)); //for this token protection created in protection.js

        dispatch({type: Types.PROFILE_UPDATE_SUCCESS});
        dispatch({type: Types.USER_LOGIN_SUCCESS, payload: data});
    }
    catch(error){
        ErrorAction(error, dispatch, Types.PROFILE_UPDATE_FAIL);
    }
};


//change user password
const changePasswordAction= (passwords) => async (dispatch, getState) =>{
    try{
        dispatch({type: Types.PASSWORD_UPDATE_REQUEST});
        await Apis.changePasswordService(passwords, tokenProtection(getState));
        dispatch({type: Types.PASSWORD_UPDATE_SUCCESS});
    } catch(error){
        ErrorAction(error, dispatch, Types.PASSWORD_UPDATE_FAILED);
    }
};


//delete user account
const deleteUserAction = () => async (dispatch, getState) => {
    try{
        dispatch({type: Types.USER_DELETE_REQUEST});
        await Apis.deleteUserService(tokenProtection(getState));
        dispatch({type: Types.USER_DELETE_SUCCESS});
        dispatch(logoutAction());
    } catch(error){
        ErrorAction(error, dispatch, Types.USER_DELETE_FAIL);
    }
}


export {loginAction, logoutAction, registerAction, updateProfileAction,changePasswordAction, deleteUserAction};