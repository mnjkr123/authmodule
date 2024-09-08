import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../components/common/seo";
import Login from "../components/login/login-page";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Login"} />
      <Login />
    </Wrapper>
  );
};

export default index;
