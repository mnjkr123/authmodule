import HeaderTwo from "@/src/layout/headers/header-2";
import Breadcrumb from "../../components/common/breadcrumb/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import styles from "./Settings.module.css"; // Optional, for custom styling

const Settings = () => {
  return (
    <>
      <HeaderTwo />
      <main>
        <Breadcrumb top_title="Account" title="Settings" />
        <section className="settings-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className={styles.settingsBox}>
                  <h2 className="mb-30">Account Settings</h2>
                  <form>
                    <div className={styles.formGroup}>
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter a new password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Settings
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Settings;
