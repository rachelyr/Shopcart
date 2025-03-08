import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
// import BigLoader from "../../../Components/Notifications/BigLoader";

import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import { LoginSchema, RegistrationSchema } from "../../../Components/Validation";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import { loginAction, registerAction } from "../../Actions/UserAction";
import {BiLoaderCircle, BiLogInCircle} from "react-icons/bi";
import { Input } from "@headlessui/react";
import toast from "react-hot-toast";
import logo from "../../../images/logo.png";

function Registration() {
    const [login, setLogin] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    const redirect= state?.from ? state.from : '/';

    //validate state
    const {loading, userInfo, error} = useSelector((state) => state.userLogin);
    const {loading: regLoading, error: regError} = useSelector((state) => state.userRegister);

    console.log(userInfo)
    //validate user
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver( login ? LoginSchema : RegistrationSchema),
    });

    const handleSubmitLogin = (data) => {
        console.log('login')
        dispatch(loginAction(data));
        reset();
    };

    const handleSubmitRegistration= (data) => {
        console.log('register')
       // console.log(data)
        dispatch(registerAction(data));
        reset();
    };

//error handler
useEffect(() => {
    if(error || regError){
        toast.error(error || regError);
        dispatch({type: error ? 'USER_LOGIN_RESET' : 'USER_REGISTER_RESET'});
    }
    //logged in user is redirected to the home page
    if(userInfo){
        navigate(redirect)
    }
}, [dispatch, error, userInfo, redirect, navigate, regError]);


  return(
    <Layout header= {true}>
        <div className= 'bg-gray-200'>
            <div className= 'min-h-screen mx-auto xl:px-32 px-4 lg:py-36 py-12 flex items-center flex-col'>
                <div className="sticky xl:w-4/5 flex-col gap-4 rounded-md top-28 col-span-4 bg-white ">
                <div className="w-full grid lg:grid-cols-2 gap-4 ">
                    {/* 1 */}
                    <div className="col-span-1 row-start-2 lg:row-start-1 bg-white items-center justify-center flex flex-col sm:px-24">
                        <img
                          src={logo}
                          alt='logo'
                          className="sm:w-2/2 w-3/5 mx-auto"
                        />
                          <p className="text-sm my-3 leading-6 text-center font-semibold">
                            {!login  //based on wether its the login page or not the p will be outputed
                            ? 'Welcome Back to Shopcart, We have a wide range of products. We offer the best prices for great quality Products right to your doorstep!'
                            : 'Welcome to Shopcart, We have a wide range of products. We offer the best prices for great quality Products right to your doorstep!'}
                          </p>
                          <button onClick={() =>
                          { setLogin(!login);
                            //reset the form
                            reset();
                          }}
                          className="bg-main mt-2 text-white text-sm font-semibold py-3 w-3/4 sm:w-2/4 rounded-full ">
                                {login ? 'SignUp' : 'Login'}
                            </button>
                    </div>
                    {/* 2 */}
                    <div className="col-span-1 bg-main flex flex-col px-6 sm:px-12 py-8 sm:py-24">
                        <h1 className="text-2xl font-semibold text-white text-center">
                            {login ? 'Welcome Back' : 'Create an Account'}
                        </h1>
                        <p className="text-sm text-center my-4 text-gray-200 font-light">
                            {login ? 'Welcome back! Please Login to your account' : 'Create your account'}
                        </p>
                        <form onSubmit={handleSubmit(login ? handleSubmitLogin : handleSubmitRegistration)} className="flex flex-col gap-5 w-full">
                            {!login && (
                                <>
                                 <Input
                                  name= 'fullName'
                                  {...register('fullName')}
                                  errors= {errors.fullName}
                                  type="text"
                                  placeholder="Full Name"
                                 />
                                  <Input
                                  name= 'phone'
                                  {...register('phone')}
                                  errors={errors.phone}
                                  type='number'
                                  placeholder="Phone Number"
                                  />
                                </>
                            )}
                                  <Input
                                  name='email'
                                  {...register('email')}
                                  errors={errors.email}
                                  type='email'
                                  placeholder="Email"
                                  />
                                  <Input
                                  name='password'
                                  {...register('password')}
                                  errors={errors.password}
                                  type='password'
                                  placeholder="Password"
                                  />
                         <button
                         disabled= {loading || regLoading}
                         type="submit"
                         className="bg-black flex flex-row justify-center gap-4 text-white text-sm font-semibold py-4"
                        >
                            { loading || regLoading
                            ?(
                                <BiLoaderCircle className='animate-spin text-white' />
                            )
                            :(
                            <>
                              {login ? 'LOGIN' : 'SIGN UP'}
                              <BiLogInCircle className="w-5 h-5"/>
                            </>
                            )}
                          </button>
                        </form>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  );
}

export default Registration;