import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import '../css/Auth.css';

function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await signUp(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="auth">
      <h2>Sign Up</h2>
      {err && <div className="error-message">{err}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email"
               value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password"
               value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;