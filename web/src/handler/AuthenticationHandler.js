import { useResetRecoilState, useSetRecoilState } from "recoil";
import { signInService, signUpService, verifyOTPService } from "../services/authenticationService";
import toast from "react-hot-toast";
import { AuthState } from "../atom/authState";

const AuthenticationHandler = () => {
  const resetAuthState = useResetRecoilState(AuthState);
  const setAuthData = useSetRecoilState(AuthState);

  const signUpHandler = async (data) => {
    const { email, name, password, confirmPassword } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const result = await signUpService(data);
      if (result.status === 200) {
        toast.success(result.data.message);
        return result;
      } else if (result.status === 202) {
        toast.success(result.data.message);
        return new Error("Already registered !");
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      toast.error("Signup failed. Please try again later.");
    }
  };

  const signInHandler = async (data) => {
    try {
      const { email, password } = data;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !email.trim() || !emailRegex.test(email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (!password) {
        toast.error("Password field cannot be empty !");
        return;
      }

      const result = await signInService(data);

      if (result.status === 200) {
        toast.success("Sign In was successful");
        setAuthDetails(result);
        return result;
      }

      if (result.status === 202) {
        toast.error("Invalid email or password");
        return result;
      }
    } catch (error) {
      console.error("Sign In failed:", error.message);
      toast.error("Sign In failed. Please try again.");
    }
  };

  const verifyOTPHandler = async(data) => {
     await verifyOTPService(data)
       .then((res) => {
         console.log(res);
       })
       .catch((err) => console.log(err));
  }

  const setAuthDetails = (res) => {
    const data = res.data.data;
    localStorage.setItem("userData", JSON.stringify(data));
    setAuthData({ ...data });
  };

  const logOutHandler = () => {
    localStorage.removeItem("userData");
    resetAuthState();
  }

  const googleLoginHandler = async(accessToken) => {
    const result = await signInService({ accessToken });
    if (result.status === 200) {
      toast.success("Sign In was successful");
      setAuthDetails(result);
      return result;
    }
  }

  return {
    signUpHandler,
    signInHandler,
    logOutHandler,
    googleLoginHandler,
    verifyOTPHandler,
  };
};

export default AuthenticationHandler;
