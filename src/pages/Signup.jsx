import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import '../css/Auth.css';

function Signup() {
   const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    setErr("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username }); // simpan username
    console.log("User created:", userCredential.user);
  } catch (error) {
    console.error(error);
    setErr(error.message);
  }
};


  const handleGoogle = async () => {
  setErr('');
  try {
    const result = await signInWithGoogle();
    const user = result.user;

    // Ambil username → dari displayName atau email prefix
    const finalUsername = user.displayName || user.email.split('@')[0];

    // Update profile user di Firebase
    await updateProfile(user, { displayName: finalUsername });

    // Setelah signup berhasil → arahkan ke Home (atau halaman lain)
    navigate('/', { replace: true });
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
                  
                  
                        {/* {err && <div className="error-message">{err}</div>} */}
                       <form onSubmit={handleSubmit} className="auth-form space-y-4 md:space-y-6">
                            {/* Username */}
                            <input
                              type="text"
                              placeholder="Username"
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />

                            {/* Email */}
                            <input
                              type="email"
                              placeholder="Email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />

                            {/* Password */}
                            <input
                              type="password"
                              placeholder="Password"
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />

                            {/* Confirm Password */}
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                              Create Account
                            </button>

                             {/* divider */}
                            <div className="relative flex items-center">
                              <div className="flex-grow border-t border-gray-300"></div>
                              <span className="flex-shrink mx-4 text-gray-400">Or</span>
                              <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                          {/* google button */}
                          <button className='w-full flex justify-center items-center text-blue-400 bg-white hover:bg-gray-100 focus:ring-4 font-semibold rounded-lg text-md px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' 
                           onClick={handleGoogle}><img src="/images/google.svg" className=' w-5 h-5 mx-2' alt="Logo" /> Login with Google</button>

                          </form>

                        
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