import Link from "next/link";
import React from "react";
import LoginForm from "../forms/login-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginArea = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if there is a query parameter indicating logout
    if (router.query.logout === "true") {
      setMessage("You have been logged out successfully.");
    }
  }, [router.query]);

  return (
    <>
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="mb-20">Login Here</h3>
                <p>Welcome!</p>
                {message && <p>{message}</p>} {/* Display the message */}
                <div className="mb-30"></div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginArea;
