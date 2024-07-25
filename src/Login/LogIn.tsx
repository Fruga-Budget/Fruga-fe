import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
// import { UserBudget } from '../Interfaces';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [nextUserId, setNextUserId] = useState(1); 
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'example' && password === 'password') {
      const userId = 1;
      setUserId(userId);
      navigate(`/getting-started/${userId}`);
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleRegister = () => {
    if (name && username && password) {
      setUserId(nextUserId);
      setNextUserId(nextUserId + 1);
      setIsRegistering(false);
      alert('Registered successfully!');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className='login-section'>
      <h2>Login or Register Here!</h2>
      <form className='login-form'>
        {isRegistering ? (
          <div className='input'>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        ) : null}
        <div className='input'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='input'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        </form>
        <div>
          {isRegistering ? (
            <Link to={userId !== null ? `/getting-started/${userId}` : '#'}>
              <button type="button" onClick={handleRegister}>Register</button>
            </Link>
          ) : (
            <Link to={userId !== null ? `/getting-started/${userId}` : '#'}>
              <button type="button" onClick={handleLogin}>Login</button>
            </Link>
          )}
          <button type="button" onClick={toggleRegister}>
            {isRegistering ? 'Back to Login' : 'Register'}
          </button>
        </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
