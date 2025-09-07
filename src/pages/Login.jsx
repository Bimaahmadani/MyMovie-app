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
    <div className="auth">
      <div className="w-full p-8 bg-red-500 rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <h2 className='text-3xl font-bold '>Login</h2>

          {err && <div className="error-message">{err}</div>}
          <form onSubmit={handleSubmit} className="auth-form mt">
            <input type="email" placeholder="Email"
                  value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Password"
                  value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>

          <button onClick={handleGoogle}>Login with Google</button>
          <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
      </div>
         
        
    </div>
     
  );
}

export default Login;