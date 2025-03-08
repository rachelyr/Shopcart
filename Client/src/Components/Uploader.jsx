import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import {toast} from 'react-hot-toast';
import {BiLoaderCircle} from 'react-icons/bi';
import {FiUploadCloud} from 'react-icons/fi';
import axios from 'axios';


function Uploader({image, setImage}) {
    const [loading, setloading] = useState(false);
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dcqjcnz6u/image/upload';

    //upload file
    const onDrop = useCallback( async (acceptedFiles) => {
        try{
            setloading(true);
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            formData.append('upload_preset', 'shopcart'); //shopcart is the preset name
            const {data} = await axios.post(cloudinaryUrl, formData);
            setImage(data.secure_url);
            setloading(false);
            toast.success("Profile Updated");
        } catch(error) {
            toast.error(error.message);
            setloading(false);
        }
    }, [setImage]);

    const {getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept: {'image/jpeg':['.jpeg', '.jpg'], 'image/png': ['.png']},
        onDrop,
    });

    return (
        <div className='w-full text-center grid grid-cols-12 gap-4'>
            <div className='px-6 lg:col-span-10 flex flex-col sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-dashed'
            {...getRootProps()}
            >
                <input {...getInputProps()}/>
                <span className='mx-auto flex justify-center'>
                    <FiUploadCloud className='text-3xl text-main'/>
                </span>
                <p className='text-sm mt-2'>Drag your image here</p>
                <em className='text-xs text-gray-400'>
                    (Only *.jpeg and *.png images will be accepted)
                </em>
            </div>
            <div className='lg:col-span-2 sm:col-span-4 col-span-12'>
                    {loading ? (
                        <div className='px-6 w-full bg-dryGray flex-col flex h-32 border-2 border-border border-dashed'>
                            <BiLoaderCircle className='mx-auto text-mai text-3xl animate-spin'/>
                            <span className='text-sm mt-2 text-text'>Uploading...</span>
                        </div>
                    ): (
                        <img src={image ? image : 'https://via.placeholder.com/300'}
                            alt ='Placeholder'
                            className='w-full h-32 rounded object-cover'
                        />
                    )}
                </div>
        </div>
    );
};


export default Uploader;