"use client"
import React from 'react'
import {useFormik} from  "formik";
import * as Yup from "yup"


//Validator
const supportFormSchema = Yup.object().shape({
    firstName: Yup.string()
    .min(1,"Yoir first name must be more than 1 character ")
    .max(20, "Your first name must be more than 20 characters")
    .required("First name is required"),
    lastName:Yup.string()
    .min(1, "Your last name is too short")
    .max(20, "Your last name is too long")
    .required("Last name is required"),
    email: Yup.string().email("Invalid email. Please enter a vaild email address").required("Email is required"),
    message: Yup.string()
    .min(3,"Your subject must contain at least 3 characters")
    .max(60, "Your subject must be less than 60 characters")
    .required("Message is required"),
    other: Yup.string()
    .min(5, "Your message must contain at least 5 characters")
    .max(200,"Your message must cotain less than 200 characters")
})

const SupportForm = () => {
    const formik = useFormik({
        initialValues:{
            firstName:"",
            lastName:"",
            email:"",
            subject:"",
            message:"", 
            other:""
        },
        onSubmit(values) {
           console.log("Form submitted:" ,values);
        },
    })
  return (
    <form onSubmit={formik.handleSubmit}
    className='md:px-0 flex flex-col justify-center items-start gap-7'>
       <div className="flex flex-col md:flex-row justify-center items-center gap-7 md:gap-[5rem] ">
        <div className="flex flex-col justify-center items-start gap-2">
          <label htmlFor="firstName" className="text-gray-600">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className={`outline-none border pl-5 pr-[4rem] px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <label htmlFor="lastName" className="text-gray-600">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={`outline-none border pl-5 pr-[4rem] px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="email" className="text-gray-600">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="subject" className="text-gray-600">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.subject && formik.errors.subject
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.subject && formik.errors.subject && (
          <div className="text-red-500 text-sm">{formik.errors.subject}</div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
  <label htmlFor="subject" className="text-gray-600">
    Message
  </label>
  <textarea
    id="subject"
    name="subject"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.message}
    className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
      formik.touched.message && formik.errors.message
        ? "border-red-500"
        : ""
    }`}
    rows= {4} // Adjust the number of rows as needed
  />
  {formik.touched.message && formik.errors.message && (
    <div className="text-red-500 text-sm">{formik.errors.message}</div>
  )}
</div>
<div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="business" className="text-gray-600">
          Other (Optional)
        </label>
        <input
          id="business"
          name="business"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.other}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.other && formik.errors.other
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.other && formik.errors.other && (
          <div className="text-red-500 text-sm">{formik.errors.other}</div>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 w-full px-6 py-3 bg-lime-300 text-black font-medium rounded-md"
        disabled={!(formik.isValid && formik.dirty)}
      >
        Submit Ticket
      </button>
    </form>
  )
}

export default SupportForm