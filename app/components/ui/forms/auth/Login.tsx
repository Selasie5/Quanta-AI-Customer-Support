"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastProvider,useToasts } from "react-toast-notifications";
import { auth } from "../../../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email. Please enter a valid email address")
    .required("Email is required"),
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
});

const Login = () => {
  const { addToast } = useToasts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          setLoading(false);
          addToast("You have successfully logged in to your account", {
            appearance: "success",
            autoDismiss: true,
          });
          router.push("/supportroom");
        })
        .catch((error) => {
          setLoading(false);
          addToast(
            "There was an error logging in to your account. Please try again",
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
        });
    },
  });

  return (
   
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-center items-start gap-7"
    >
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

      <button
        type="submit"
        className="mt-4 w-full px-6 py-3 bg-lime-300 text-black font-medium rounded-md"
        disabled={!(formik.isValid && formik.dirty) || loading}
      >
        {loading ? (
          <div className="loader flex justify-center items-center">

          </div>
        ) : "Login to your account"}
      </button>
    </form>
  
  );
};

export default Login;
