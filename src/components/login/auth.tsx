import { useState } from "react";
import "./auth.css";
import authAPI from "./authAPI";
import Cookies from "js-cookie";
export default function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginUsername, setLoginUsername] = useState("sianami123@gmail.com");
  const [loginPassword, setLoginPassword] = useState("123");

  const [signupEmail, setSignupEmail] = useState("sianami123@gmail.com");
  const [signupPassword, setSignupPassword] = useState("123");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("123");

  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupEmailError, setSignupEmailError] = useState<string | null>(null);
  const [signupPasswordError, setSignupPasswordError] = useState<string | null>(
    null
  );
  const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState<
    string | null
  >(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);

    if (!loginUsername || !loginPassword) {
      setLoginError("Username and Password are required");
      return;
    }
    try {
      const response = await authAPI.login({
        email: loginUsername,
        password: loginPassword,
      });
      console.log(response);
      if (response.accessToken) {
        Cookies.set("accessToken", response.accessToken);
        window.location.href = "/products";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupEmailError(null);
    setSignupPasswordError(null);
    setSignupConfirmPasswordError(null);
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupEmailError("All fields are required");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupConfirmPasswordError("Passwords do not match");
      return;
    }

    console.log(signupEmail, signupPassword, signupConfirmPassword);
    try {
      const response = await authAPI.register({
        email: signupEmail,
        password: signupPassword,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleLogin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>

                <input
                  type="text"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              {loginError && <p className="error-text">{loginError}</p>}
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon" title="Sign in with Google">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign in with Facebook"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign in with Twitter"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign in with LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>
              </div>
            </form>

            <form className="sign-up-form" onSubmit={handleSignup}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              {signupEmailError && (
                <p className="error-text">{signupEmailError}</p>
              )}

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              {signupPasswordError && (
                <p className="error-text">{signupPasswordError}</p>
              )}
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>
              {signupConfirmPasswordError && (
                <p className="error-text">{signupConfirmPasswordError}</p>
              )}
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon" title="Sign up with Google">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign up with Facebook"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign up with Twitter"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Sign up with LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                onClick={() => setIsSignUpMode(true)}
                className="btn transparent"
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                onClick={() => setIsSignUpMode(false)}
                className="btn transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
