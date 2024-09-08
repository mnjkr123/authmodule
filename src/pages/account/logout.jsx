import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Logout.module.css"; // CSS module for styling

const Logout = () => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false); // State to trigger the animation

  useEffect(() => {
    // Start the animation before logging out
    setTimeout(() => {
      setFadeOut(true);
    }, 1000); // Wait for 1 second before starting fade out

    // Redirect after animation
    setTimeout(() => {
      // Clear authentication tokens
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      // Redirect to login page
      router.push("/login?logout=true");
    }, 1500); // 1.5 seconds delay before redirection
  }, [router]);

  return (
    <div className={`${styles.logoutMessage} ${fadeOut ? styles.fadeOut : ""}`}>
      <h1>Logging Out...</h1>
    </div>
  );
};

export default Logout;
