import { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../css/Auth.css';

function Signup() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [errors, setErrors] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

  const validateField = (name, value) => {
  let message = "";

  switch (name) {
    case "username":
      if (!value.trim()) message = "Username is required";
      else if (value.length < 3) message = "Username must be at least 3 characters";
      break;

    case "email":
      if (!/\S+@\S+\.\S+/.test(value)) message = "Invalid email address";
      break;

    case "password":
      if (value.length < 6) message = "Password should be at least 6 characters";
      break;

    case "confirmPassword":
      if (value !== password) message = "Passwords do not match";
      break;

    default:
      break;
  }

  setErrors((prev) => ({ ...prev, [name]: message }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Pastikan tidak ada error lokal
  if (Object.values(errors).some((msg) => msg !== "")) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    navigate("/");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      setErrors((prev) => ({ ...prev, email: "This email is already registered" }));
    }
    console.error(error);
  }
};



    const handleGoogle = async () => {
    setErr('');
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };


  return (
    <div className="auth">

      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>

          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">

                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Create an account</h2>
                  
                  
                        {err && <div className="error-message">{err}</div>}
                       <form onSubmit={handleSubmit} className="auth-form space-y-4 md:space-y-6">
                           {/* Username */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                  setUsername(e.target.value);
                                  validateField("username", e.target.value);
                                }}
                                onBlur={(e) => validateField("username", e.target.value)}
                                className={`w-full p-2.5 border rounded-lg ${
                                  errors.username ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  validateField("email", e.target.value);
                                }}
                                onBlur={(e) => validateField("email", e.target.value)}
                                className={`w-full p-2.5 border rounded-lg ${
                                  errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  validateField("password", e.target.value);
                                }}
                                onBlur={(e) => validateField("password", e.target.value)}
                                className={`w-full p-2.5 border rounded-lg ${
                                  errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                              <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                  validateField("confirmPassword", e.target.value);
                                }}
                                onBlur={(e) => validateField("confirmPassword", e.target.value)}
                                className={`w-full p-2.5 border rounded-lg ${
                                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                              />
                              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>

                            {/* submit button */}
                            <button
                              type="submit"
                              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                              Create Account
                            </button>

                            

                          </form>
                          {/* divider */}
                            <div className="relative flex items-center">
                              <div className="flex-grow border-t border-gray-300"></div>
                              <span className="flex-shrink mx-4 text-gray-400">Or</span>
                              <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                          {/* google button */}
                          <button className='w-full flex justify-center items-center text-blue-400 bg-white hover:bg-gray-100 focus:ring-4 font-semibold rounded-lg text-md px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' 
                           onClick={handleGoogle}><img src="/images/google.svg" className=' w-5 h-5 mx-2' alt="Logo" /> Login with Google</button>
                        
                        <p
                        className='text-medium font-light text-gray-400 dark:text-gray-400'>
                          Already have an account? <Link to="/login" className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Login</Link></p>
                      </div>
                </div>
          </div>

      </div>
   
     
  );
}

export default Signup;