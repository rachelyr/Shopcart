import axios from "axios";

//PUBLIC API

//login user api
const loginService= async (user) => {
    const {data} = await axios.post('http://localhost:5000/api/users/login', user);
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
}

//user logout

const logoutService= async => {
    localStorage.removeItem('userInfo');
    return null;
}

//REGISTER user API
const registerService = async (user) => {
    const {data} = await axios.post('http://localhost:5000/api/users', user);
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
};

//PRIVATE APIS

//update the user profile
const updateProfileService= async (user, token) => {
    const {data} = await axios.put('http://localhost:5000/api/users', user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
}

//change password
const changePasswordService = async(passwords, token) =>{
    const {data} = await axios.put('http://localhost:5000/api/users/password', passwords, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};


//delete user account api
const deleteUserService = async(token) => {
    const {data} = await axios.delete('http://localhost:5000/api/users', {
        headers:{Authorization: `Bearer ${token}`}
    });
    if (data){
        localStorage.removeItem('userInfo');
    }
    return data;
};


export {loginService, logoutService, registerService, updateProfileService, changePasswordService, deleteUserService};