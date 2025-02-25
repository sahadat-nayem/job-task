import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import registerLottieData from "../../src/assets/Animation - 1734900836147.json";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    const passwordVerification = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordVerification.test(password)) {
      toast.error(
        "Password must have uppercase, lowercase, and 6+ characters."
      );
      return;
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            setError(err);
          });

        const newUser = { name, email };

        // save new user info to the database
        fetch("https://assignment-11-server-ivory-two.vercel.app/borrow", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Signed Up successfully",
              });
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode, errorMessage);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset email sent, please check your email");
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-10 bg-white">
      <div className="text-center lg:text-left w-96">
        <Lottie animationData={registerLottieData}></Lottie>
      </div>
      <div className="card bg-base-100 w-full max-w-lg rounded-none shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center mt-10">
          Register your account
        </h2>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered bg-gray-100"
              required
            />
          </div>
          {error.name && (
            <label className="label text-sm text-red-600">{error.name}</label>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo url"
              className="input input-bordered bg-gray-100"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="input input-bordered bg-gray-100"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered bg-gray-100"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-2 top-12"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {error.password && (
              <label className="label text-sm text-red-600">
                {error.password}
              </label>
            )}
            <label onClick={handleForgetPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-outline glass bg-black text-white rounded-md">Register</button>
          </div>
        </form>
        <ToastContainer />
        <p className="text-center font-semibold">
          Already Have An Account ?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
