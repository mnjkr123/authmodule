import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../pages/api/supabaseClient"; // Update the path based on the location
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema using yup
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
        options: {
          data: {
            username: data.name, // Store the Display Name as user metadata
          },
        },
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

      // Inform user to check their email for verification
      toast.info(
        "Registration successful! Please check your email to verify your account."
      );

      // Check if user ID is available
      if (user?.id) {
        // Store additional user information in the 'profiles' table
        const { error: profileError } = await supabase.from("profiles").upsert([
          {
            id: user.id, // Use the user ID from Supabase auth
            username: data.name,
            email: data.email,
          },
        ]);

        if (profileError) {
          console.error("Error inserting/updating profile:", profileError);
          toast.error(`Profile Error: ${profileError.message}`);
        }
      } else {
        console.warn(
          "User ID is not available immediately after signup. Skipping profile update."
        );
      }

      // Clear form fields
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
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
          Display Name <span>**</span>
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Your Display Name"
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
