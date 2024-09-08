import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../pages/api/supabaseClient"; // Update the path based on the location
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid"; // Import uuid function

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(6).label("Password"),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      // Register user with Supabase authentication
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
        setIsSubmitting(false);
        return;
      }

      // Generate a random ID for the profile
      const profileId = uuidv4();

      // Store additional user information in the 'profiles' table
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: profileId, // Use the generated UUID
          username: data.name,
          email: data.email,
          password: data.password, // Consider hashing the password before storing
        },
      ]);

      if (profileError) {
        throw profileError;
      }

      toast.success("Registration successful! You may now log in.");
      reset();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <label htmlFor="name">
          User Name <span>**</span>
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Your Name"
        />
        <p className="form_error">{errors.name?.message}</p>

        <label htmlFor="email-id">
          Email Address <span>**</span>
        </label>
        <input
          {...register("email")}
          id="email-id"
          type="email"
          placeholder="Your Email"
        />
        <p className="form_error">{errors.email?.message}</p>

        <label htmlFor="pass">
          Password <span>**</span>
        </label>
        <input
          {...register("password")}
          id="pass"
          type="password"
          placeholder="Password"
        />
        <p className="form_error">{errors.password?.message}</p>

        <div className="mt-10"></div>

        <button
          type="submit"
          className="login-btn w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register Now"}
        </button>
        <div className="sign-up text-center mt-30">
          <span>Already have an account?</span>
          <Link href="/login">
            <button className="login-text-btn">Login Now</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
