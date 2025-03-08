import * as yup from 'yup';


export const LoginSchema = yup.object().shape({
    email: yup.string()
       .email('Invalid email address')
       .required('Required')
       .trim(),
    password: yup.string()
       .min(6, 'Password must be at least 6 characters')
       .required('Required')
       .max(20, 'Password should be of 20 characters maximum')
       .matches(/^\S*$/, 'Whitespace is not allowed')
});


export const RegistrationSchema = yup.object().shape({
    fullName: yup.string()
       .min(3, 'Name must be at least 3 characters')
       .required('Required')
       .max(25, 'Name should be of 25 characters maximum'),
    email: yup.string()
       .email('Invalid email address')
       .required('Required')
       .trim(),
    password: yup.string()
       .min(6, 'Password must be at least 6 characters')
       .required('Required')
       .max(25, 'Password should be of 25 characters maximum')
       .matches(/^\S*$/, 'Whitespace is not allowed'),
    phone: yup.string()
       .min(10, 'Phone number must be 10 digits')
       .max(10, 'Phone number must be 10 digits')
       .required('Required')
});


export const updateProfileSchema = yup.object().shape({
   fullName: yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Required'),
   email: yup.string()
       .email('Invalid email address')
       .required()
       .trim(),
   phone: yup.string()
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits')
      .required('Required'),
});

export const updatePasswordSchema = yup.object().shape({
   password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required')
      .max(20, 'Password should be of 20 characters maximum')
      .matches(/^\S*$/, 'Whitespace is not allowed'),
   confirmPassword: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required')
      .max(20, 'Password should be of 20 characters maximum')
      .matches(/^\S*$/, 'Whitespace is not allowed'),
   oldPassword: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required')
      .max(20, 'Password should be of 20 characters maximum')
      .matches(/^\S*$/, 'Whitespace is not allowed'),
   newPassword: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required')
      .max(20, 'Password should be of 20 characters maximum')
      .matches(/^\S*$/, 'Whitespace is not allowed'),
});