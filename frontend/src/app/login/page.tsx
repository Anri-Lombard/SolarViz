"use client"

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/LoginContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');// state for error message
  const router = useRouter();
  const { login } = useAuth(); // get login function

  const handleLogin = async () => {
    try {
      setError(''); //clear previous error message
      const response = await axios.post('http://localhost:8000/api-token-auth/', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      login(); // call log in function from context
      router.push('login/admin/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Incorrect username or password. Try again.')
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 bm-3"
        >{error}
      </div>}

      <input
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <input type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      />
      
      <button onClick={handleLogin} className="mt-5 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block">Login</button>
    </div>
  );
};

export default LoginPage;
