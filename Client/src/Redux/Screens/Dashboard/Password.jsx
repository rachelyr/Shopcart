import React, { useEffect } from "react";
import Sidebar from './Sidebar';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {updatePasswordSchema} from '../../../Components/Validation';
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { changePasswordAction } from "../../Actions/UserAction";


const Password = () => {
    const dispatch= useDispatch();

    //state
    const {loading, error, success} = useSelector((state) => state.userChangePassword);

    //validate user
    const {register, handleSubmit, setValue, formState: {errors}}
    = useForm({ resolver: yupResolver(updatePasswordSchema)});

    const handlerSubmit= (data) => {
        dispatch(changePasswordAction({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        }));
    };

    //error handler
    useEffect(()=> {
        if(error){
            toast.error(error);
            dispatch({type: 'PASSWORD_UPDATE_RESET'})
        }

        //success handler
        if (success){
            setValue('oldPassword', '');
            setValue('newPassword', '');
            setValue('confirmPassword', '');
            dispatch({type: 'PASSWORD_UPDATE_RESET'});
            toast.success('Password Changed!');
        }
    }, [error, dispatch, success, setValue]);

  return (
    <Sidebar>
      <Toaster/>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Change Password</h2>
        <form onSubmit={handleSubmit(handlerSubmit)}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Old Password</label>
            <input
              type="password"
              placeholder="******"
              label="Current Password"
              {...register("oldPassword")}
              name={"oldPassword"}
            />
            <span className="text-xs text-red-500">
              {errors.oldPassword?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 pt-3">New Password</label>
            <input
              type="password"
              placeholder="******"
              label="New Password"
              {...register("newPassword")}
              name={"newPassword"}
            />
            <span className="text-xs text-red-500">
              {errors.newPassword?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 pt-3">Confirm Password</label>
            <input
              type="password"
              placeholder="******"
              label="Confirm Password"
              {...register("confirmPassword")}
              name={"confirmPassword"}
            />
            <span className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </span>
          </div>
          <div className="flex justify-end items-center my-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-main sm:w-auto w-full font-medium text-white py-3 px-6 rounded disabled:opacity-50"
            >
              {loading ? "Loading..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};

export default Password;
