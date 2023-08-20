"use client"

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api-token-auth/', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('login/admin/');
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Handle login failure (e.g., show an error message)
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
      <button onClick={login} className="mt-5 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block">Login</button>
    </div>
  );
};

export default LoginPage;
