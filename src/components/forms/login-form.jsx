import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../api/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

// Validation schema using yup
const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // Getting login method from AuthContext

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Sign in the user using Supabase's built-in auth
      const { error, data: session } = await supabase.auth.signInWithPassword({
        email: data.email.toLowerCase(),
        password: data.password,
      });
      login({ email: data.email }); // Set user in auth context
      //   console.log("Username from AuthContext:", user?.email);
      //   console.log("User object:", user);
      if (error) {
        // Show error if sign-in fails
        toast.error(`Error: ${error.message}`);
      } else {
        // Successful login: notify user and redirect
        toast.success("Login successful!");
        router.push("/"); // Redirect to home or dashboard after login
      }

      reset(); // Clear form after submission
    } catch (error) {
      // Handle any unexpected errors
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />

        {/* Email Field */}
        <label htmlFor="email">
          Email <span>**</span>
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Your Email"
        />
        <p className="form_error">{errors.email?.message}</p>

        {/* Password Field */}
        <label htmlFor="password">
          Password <span>**</span>
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
        />
        <p className="form_error">{errors.password?.message}</p>

        {/* Remember me and Lost password links */}
        <div className="login-action mb-20 fix">
          <span className="log-rem f-left">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me!</label>
          </span>
          <span className="forgot-login f-right">
            <Link href="#">Lost your password?</Link>
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="login-btn w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login Now"}
        </button>

        {/* Register link */}
        <div className="sign-up text-center mt-30">
          <span>New User?</span>
          <button type="button" className="login-text-btn">
            <Link href="/register">Register Now</Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
