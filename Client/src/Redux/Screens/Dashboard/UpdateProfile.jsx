import { Input } from '@headlessui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {updateProfileSchema} from '../../../Components/Validation';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUserAction, updateProfileAction } from '../../Actions/UserAction';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import Uploader from '../../../Components/Uploader';


function UpdateProfile() {
    const [image, setImage] = useState(null);
    const dispatch= useDispatch();

    //state
    const {loading, error, success} = useSelector((state) =>state.userProfileUpdate);
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = useSelector((state) => state.deleteUserAccount);
    const {userInfo}= useSelector((state) => state.userLogin);

    //validate user
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(updateProfileSchema),
    });

    //update user
    const handlerSubmit= (data) => {
        console.log(data);
        dispatch(
            updateProfileAction({
                ...data,
                image: image || userInfo.image
            })
        )
    };

    //delete user
    const handlerDelete= () => {
        window.confirm('All your data will be lost. Are you sure?') &&
        dispatch(deleteUserAction())
    };

    //set user data
    useEffect(() => {
        if (userInfo) {
          setValue("fullName", userInfo.name);
          setValue("email", userInfo.email);
          setValue("phone", userInfo.phone);
          setImage(userInfo.image);
        }
    }, [userInfo, setValue, setImage]) //i may have to remove setImage

    //classes
    const inp = 'border-gray-200';

    //error handler
    useEffect(() => {
        if(error || deleteError){
            toast.error(error || deleteError);
            dispatch({type: error? 'PROFILE_UPDATE_RESET' : 'USER_DELETE_RESET'});
        }
        //if successfully done- toast success and reset's the state
        if(success || deleteSuccess){
            toast.success(success ? 'Profile Updated' : 'Account Deleted');
            dispatch({type: success ? 'PROFILE_UPDATE_RESET' : 'USER_DELETE_RESET' });
        }
    }, [error, success, dispatch, deleteError, deleteSuccess])


    return (
      <Sidebar>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Profile</h2>
          <Uploader image={image} setImage={setImage} />
          <Input
            type="text"
            placeholder="Full Name"
            label="Full Name"
            {...register("fullName")}
            errors={errors.fullName}
            name={"fullName"}
            className={inp}
          />
          <span className="text-xs text-red-500 ">
            {errors.fullName?.message}
          </span>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
                type="email"
                placeholder="user@gmail.com"
                label="Email"
                {...register("email")}
                errors={errors.email}
                name={"email"}
                className={inp}
              />
              <span className="text-xs pt-2 text-red-500 ">
                {errors.email?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <Input
                type="number"
                placeholder="Phone Number"
                label="Phone Number"
                {...register("phone")}
                errors={errors.phone}
                name={"phone"}
                className={inp}
              />
              <span className="text-xs pt-2 text-red-500 ">
                {errors.phone?.message}
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center">
            <button
              disabled={deleteLoading || loading}
              onClick={handlerDelete}
              className="bg-flash font-medium text-white py-3 px-6 rounded sm:w-auto w-full"
            >
              {" "}
              {deleteLoading ? "Removing Account..." : "Delete Account"}
            </button>
            <button
              disabled={loading || deleteLoading}
              onClick={handleSubmit(handlerSubmit)}
              className="bg-main font-medium text-white py-3 px-6 rounded sm:w-auto w-full"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </Sidebar>
    );
}

export default UpdateProfile;