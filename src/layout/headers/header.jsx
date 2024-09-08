import React from "react";
import header_logo from "@assets/img/logo/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import useSticky from "@/src/hooks/use-sticky";
import NavMenu from "./nav-menu";
import MobileMenus from "./mobile-menus";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const HeaderOne = () => {
  const { sticky } = useSticky();
  const { user } = useAuth(); // Extract user from AuthContext
  console.log("Username from AuthContext:", user?.email);

  return (
    <>
      <header
        id="header-sticky"
        className={`header-transparent header-text-white ${
          sticky && "sticky-bar"
        }`}
      >
        <div className="header-area">
          <div className="container">
            <div className="position-relative">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2">
                  <div className="logo">
                    <Link href="/">
                      <Image src={header_logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 position-static">
                  <div className="main-menu red-menu white-menu text-center d-none d-lg-block">
                    <div className="mean-push"></div>
                    <nav id="mobile-menu">
                      <NavMenu username={user?.email} />{" "}
                      {/* Pass username as prop */}
                    </nav>
                  </div>
                  <div className="mobile-menu mean-container d-lg-none">
                    <div className="mean-bar">
                      <MobileMenus />
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 d-none d-lg-block">
                  <div className="header-btn text-right">
                    <a
                      href="#"
                      className="x-btn btn-border btn-squ x-btn-white"
                    >
                      free trial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;
