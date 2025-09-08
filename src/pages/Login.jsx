import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../css/Auth.css'; // opsional

function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message);
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
    <div className="auth  ">

      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
         <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
              
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Login in to your account</h2>

                      {err && <div className="error-message">{err}</div>}
                      <form onSubmit={handleSubmit} className="auth-form space-y-4 md:space-y-6">
                      
                         {/* email inputi */}
                        <div>
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> 
                          <input type="email" placeholder="Email"
                          className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        </div>
                      
                        {/* password input */}
                        <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" placeholder="Password"
                          className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={password} onChange={(e)=>setPassword(e.target.value)} required />
                        </div>

                          {/* submit button */}
                         <button 
                             className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' 
                             type="submit">Login</button>
                         <div className="relative flex items-center">
                          <div className="flex-grow border-t border-gray-300"></div>
                          <span className="flex-shrink mx-4 text-gray-400">Or continue with</span>
                          <div className="flex-grow border-t border-gray-300"></div>
                         </div>
                          <button className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' 
                          onClick={handleGoogle}>Login with Google</button>
                          
                          <p className='text-medium font-light text-gray-400 dark:text-gray-400"'>
                                Don’t have an account? <Link to="/signup" className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                                Sign up</Link></p>
                       
                      
                      </form>
                    
                     
                     
                </div>
              
          </div>
      </div>
         
        
    </div>
     
  );
}

export default Login;