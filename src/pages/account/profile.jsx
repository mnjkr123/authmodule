import HeaderTwo from "@/src/layout/headers/header-2";
import Breadcrumb from "../../components/common/breadcrumb/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../api/supabaseClient";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          return;
        }

        const session = sessionData.session;

        if (!session) {
          console.log("No active session. Redirecting to login page.");
          router.push("/login"); // Redirect to login if no session
          return;
        }

        const userEmail = session.user.email;

        // Fetch user data from Profiles table using email
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setUser({
            name: data.username || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <>
      <HeaderTwo />
      <main>
        <Breadcrumb top_title="Account" title="Profile" />
        <section className="profile-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                {loading ? (
                  <p>Loading...</p>
                ) : user ? (
                  <div className={styles.profileBox}>
                    <h2 className="mb-30">Profile Information</h2>
                    <div className={styles.profileDetails}>
                      <div className={styles.profileItem}>
                        <strong>Name:</strong>
                        <span>{user.name}</span>
                      </div>
                      <div className={styles.profileItem}>
                        <strong>Email:</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No profile information available. Please log in.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
