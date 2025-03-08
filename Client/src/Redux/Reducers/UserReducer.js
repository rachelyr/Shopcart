import * as Types from '../Constants/AllConstants';


export const LoginReducer = (state = {}, action) => {
    switch (action.type){
        case Types.USER_LOGIN_REQUEST:
            return {loading: true};
        case Types.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case Types.USER_LOGIN_FAILED:
            return { loading: false, error: action.payload};
        case Types.USER_LOGIN_RESET || Types.USER_LOGOUT:
            return {};
        default:
            return state; //initial state as it is
    }
};


export const RegisterReducer = (state = {}, action) => {
    switch (action.type){
        case Types.USER_REGISTER_REQUEST:
            return {loading: true};
        case Types.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case Types.USER_REGISTER_FAILED:
            return { loading: false, error: action.payload};
        case Types.USER_REGISTER_RESET:
            return {};
        default:
            return state; //initial state as it is
    }
};


export const UpdateProfileReducer = (state = {}, action) =>{
    switch (action.type){
        case Types.PROFILE_UPDATE_REQUEST:
            return {loading: true};
        case Types.PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case Types.PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload};
        case Types.PROFILE_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const ChangePasswordReducer = (state = {}, action) =>{
    switch(action.type){
        case Types.PASSWORD_UPDATE_REQUEST:
            return {loading: true};
        case Types.PASSWORD_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case Types.PASSWORD_UPDATE_FAILED:
            return {loading: false, error: action.payload};
        case Types.PASSWORD_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const deleteAccountReducer = (state={}, action) =>{
    switch (action.type){
        case Types.USER_DELETE_REQUEST:
            return {loading: true};
        case Types.USER_DELETE_SUCCESS:
            return {loading: false, success: true};
        case Types.USER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case Types.USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
}