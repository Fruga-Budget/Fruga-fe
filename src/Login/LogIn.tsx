import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simulate login logic, here you would typically make an API call
    if (username === 'example' && password === 'password') {
      // Successful login logic, could redirect or set a flag
      alert('Logged in successfully!');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleRegister = () => {
    // Simulate registration logic, here you would typically make an API call
    if (name && username && password) {
      // Successful registration logic, could redirect or set a flag
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
    <div>
      <h2>Login or Register Here!</h2>
      <form>
        {isRegistering ? (
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        ) : null}
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          {isRegistering ? (
            <Link to={'/getting-started'}><button type="button" onClick={handleRegister}>Register</button></Link>
          ) : (
            <Link><button type="button" onClick={handleLogin}>Login</button></Link>
          )}
          <button type="button" onClick={toggleRegister}>
            {isRegistering ? 'Back to Login' : 'Register'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
