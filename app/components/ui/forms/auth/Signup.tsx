"use client";
import React,{useState} from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import {auth} from "../../../../../config/firebase"
import { ToastProvider,useToasts } from "react-toast-notifications";


const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Your first name must be more than 1 character")
    .max(20, "Your first name must be less than 20 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(1, "Your last name must be more than 1 character")
    .max(20, "Your last name must be less than 20 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email. Please enter a valid email address")
    .required("Email is required"),
  business: Yup.string().email(
    "Invalid email. Please enter a valid email address"
  ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("You must confirm your password"),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      business: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log("Form Submitted:", values);
       try {
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential)=>
        {
          const user = userCredential.user
          addToast("You have successfully logged in to your account", {
            appearance: "success",
            autoDismiss: true,
          });
          router.push("/supportroom")
        })
        .catch((Error)=>
        {
          addToast(
            "There was an error logging in to your account. Please try again",
            {
              appearance: "error",
              autoDismiss: true,
            }),
          setLoading(false);
          console.error(Error)
          
        })
       } catch (error) {
        console.error(error)
       }
    },
  });
  const provider= new GoogleAuthProvider();
  //Google signup
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in: ", user);
        console.log("Access token: ", token);
      
        router.push("/dashboard")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData ? error.customData.email : null;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in: ", errorCode, errorMessage);
        
        if (email) console.error("Email: ", email);
        if (credential) console.error("Credential: ", credential);
      });
  };


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-center items-start gap-7 w-full"
    >
        

        <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="email" className="text-gray-600">
          First Name
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.firstName && formik.errors.firstName ? "border-red-500" : ""
          }`}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        )}
      </div>
 
        <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="email" className="text-gray-600">
          Last Name
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.lastName && formik.errors.lastName ? "border-red-500" : ""
          }`}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        )}
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
        <label htmlFor="business" className="text-gray-600">
          Business Email (Optional)
        </label>
        <input
          id="business"
          name="business"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.business}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.business && formik.errors.business
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.business && formik.errors.business && (
          <div className="text-red-500 text-sm">{formik.errors.business}</div>
        )}
      </div>

      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="password" className="text-gray-600">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>

      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <label htmlFor="confirmPassword" className="text-gray-600">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={`outline-none border w-full px-3 py-[0.7rem] text-gray-500 border-gray-400 rounded-md ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-500 text-sm">
            {formik.errors.confirmPassword}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full px-6 py-3 bg-lime-300 text-black font-medium rounded-md"
        disabled={!(formik.isValid && formik.dirty)}
      >
       {loading ? (
          <div className="loader flex justify-center items-center">

          </div>
        ) : "Create your account"}
      </button>
          <div className="w-full">
            <button
              type="submit"
              onClick={signInWithGoogle}
              className=" flex justify-center items-center gap-3 mt-4 w-full px-6 py-3 bg-gray-200 text-black font-medium rounded-md"
            >
              <Image src="/google.svg" width={20} height={50} alt="Google" />
              Sign Up With Google
            </button>
          </div>
    </form>
  );
};

export default Signup;
