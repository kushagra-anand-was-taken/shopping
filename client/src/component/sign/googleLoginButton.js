import React from "react";
import GoogleLogin from "react-google-login";

function googleLoginButton({ googlechange }) {
  const responseGoogle = (response) => {
    googlechange(
      response.profileObj.email,
      response.profileObj.googleId,
      response.profileObj.name
    );
  };
  return (
    <div>
      <GoogleLogin
        clientId="174690602520-ck10cvcnl96uhb38llich0ifie18a0ce.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default googleLoginButton;
