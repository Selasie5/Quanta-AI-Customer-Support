"use client"
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(1, 'Your last name must be more than 1 character')
    .max(20, 'Your last name must be less than 20 characters')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email. Please enter a valid email address')
    .required('Email is required'),
  business: Yup.string()
    .email('Invalid email. Please enter a valid email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('You must confirm your password'),
});

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      business: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-start gap-7'>
      <div className='flex justify-center items-center gap-[5rem]'>
        <div className='flex flex-col justify-center items-start gap-2'>
          <label htmlFor='firstName' className='text-gray-600'>First Name</label>
          <input
            id="firstName"
            name='firstName'
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className={`outline-none border pl-5 pr-[4rem] px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''}`}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className='text-red-500 text-sm'>{formik.errors.firstName}</div>
          )}
        </div>
        <div className='flex flex-col justify-center items-start gap-2'>
          <label htmlFor='lastName' className='text-gray-600'>Last Name</label>
          <input
            id="lastName"
            name='lastName'
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={`outline-none border pl-5 pr-[4rem] px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''}`}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className='text-red-500 text-sm'>{formik.errors.lastName}</div>
          )}
        </div>
      </div>

      <div className='flex flex-col justify-center items-start gap-2 w-full'>
        <label htmlFor='email' className='text-gray-600'>E-mail</label>
        <input
          id="email"
          name='email'
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='text-red-500 text-sm'>{formik.errors.email}</div>
        )}
      </div>

      <div className='flex flex-col justify-center items-start gap-2 w-full'>
        <label htmlFor='business' className='text-gray-600'>Business Email (Optional)</label>
        <input
          id="business"
          name='business'
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.business}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.business && formik.errors.business ? 'border-red-500' : ''}`}
        />
        {formik.touched.business && formik.errors.business && (
          <div className='text-red-500 text-sm'>{formik.errors.business}</div>
        )}
      </div>

      <div className='flex flex-col justify-center items-start gap-2 w-full'>
        <label htmlFor='password' className='text-gray-600'>Password</label>
        <input
          id="password"
          name='password'
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='text-red-500 text-sm'>{formik.errors.password}</div>
        )}
      </div>

      <div className='flex flex-col justify-center items-start gap-2 w-full'>
        <label htmlFor='confirmPassword' className='text-gray-600'>Confirm Password</label>
        <input
          id="confirmPassword"
          name='confirmPassword'
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div>
        )}
      </div>

      <button type="submit" className='mt-4 w-full px-6 py-3 bg-lime-300 text-black font-medium rounded-md'
       disabled={!(formik.isValid && formik.dirty)}
      >Sign Up</button>
    </form>
  )
}

export default Signup;
