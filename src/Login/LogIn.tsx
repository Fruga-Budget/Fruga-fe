import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// import { UserBudget } from '../Interfaces';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [nextUserId, setNextUserId] = useState(0);
  const navigate = useNavigate();
  // need to set user on login, so we can get their budgets to populate in saved budgets
  // const [user, setUser] = useState([]) // not 100% sure what this will be yet

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data,"login")
        // console.log(data.data.attributes.user_name, 'api check')
        // console.log(username, 'front end check')
        if (data.data.attributes.user_name === username) {
          localStorage.setItem('userId', data.data.id);
          navigate(`/getting-started/${data.data.id}`);
        } else {
          setError('Invalid username or password.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };

  const handleRegister = async () => {
    if (username && password === passwordConfirm) {
      try {
        const response = await fetch('https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: username,
            password,
            password_confirmation: passwordConfirm,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Registered successfully!');
          navigate(`/getting-started/${data.data.id}`); 
          setNextUserId(nextUserId + 1);
          setIsRegistering(false);
          console.log(data, 'register')
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Registration failed.');
        }
      } catch (error) {
        setError('An error occurred during registration.');
      }
    } else {
      setError('Please fill in all fields correctly.');
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
        <div>
          <label>Username:</label>
          <input className='login-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className='login-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isRegistering && (
          <div>
            <label>Confirm Password:</label>
            <input className='login-input' type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>
        )}
      </form>
      <div>
        {isRegistering ? (
          <button type="button" onClick={handleRegister}>Register</button>
        ) : (
          <button type="button" onClick={handleLogin}>Login</button>
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
