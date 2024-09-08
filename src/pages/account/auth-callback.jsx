import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../api/supabaseClient"; // Make sure the correct path to Supabase client is set

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const syncUserData = async () => {
      try {
        // Get the current session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          // Redirect to login if there's an issue with fetching session
          router.push("/login?error=session");
          return;
        }

        const session = sessionData?.session;

        if (session) {
          const user = session.user;

          // Insert or update user data in the database (e.g., Profiles table)
          const { data, error } = await supabase.from("profiles").upsert({
            id: user.id,
            email: user.email,
            username: user.user_metadata?.username || "Anonymous", // Fetch username correctly
            created_at: new Date(),
          });

          if (error) {
            console.error("Error syncing user data:", error);
            // Redirect to profile with an error query parameter
            router.push("/account/profile?error=sync");
          } else {
            console.log("User data synced successfully:", data);

            // Redirect to Profile page after successful sync
            router.push("/account/profile");
          }
        } else {
          // If no session, redirect to login
          console.error("No active session. Redirecting to login page.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error during user data sync:", error);
        // Redirect to profile with an error query parameter
        router.push("/account/profile?error=exception");
      }
    };

    syncUserData();
  }, [router]);

  return (
    <div>
      <h1>Syncing your data...</h1>
      <p>
        Please wait while we sync your data and redirect you to your profile.
      </p>
    </div>
  );
};

export default AuthCallback;
