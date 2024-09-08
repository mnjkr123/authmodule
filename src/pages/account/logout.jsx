import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient"; // Import Supabase client
import styles from "./Logout.module.css"; // CSS module for styling

const Logout = () => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false); // State to trigger the animation

  useEffect(() => {
    const handleLogout = async () => {
      // Trigger fade-out animation after 1 second
      const fadeOutTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 1000);

      try {
        // Sign out the user from Supabase session
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error during sign out:", error);
        }
      } catch (error) {
        console.error("Error signing out:", error);
      }

      // Redirect after animation ends and after clearing tokens
      const redirectTimeout = setTimeout(() => {
        // Clear auth tokens from localStorage and sessionStorage
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");

        // Redirect to login page with a query parameter indicating successful logout
        router.push("/login?logout=true");
      }, 1500); // 1.5 seconds to complete fade-out before redirection

      // Cleanup timeouts if the component is unmounted before they complete
      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(redirectTimeout);
      };
    };

    handleLogout();
  }, [router]);

  return (
    <div className={`${styles.logoutMessage} ${fadeOut ? styles.fadeOut : ""}`}>
      <h1>Logging Out...</h1>
    </div>
  );
};

export default Logout;
