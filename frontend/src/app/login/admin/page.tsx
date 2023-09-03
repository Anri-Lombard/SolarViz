"use client"

import axios from 'axios';
import withAdminAuth from '../../components/WithAdminAuth';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/LoginContext';
import '../../styles/Admin.css';

type ColorType = 'incomerPower' | 'solarPower' | 'water';

interface Admin {
  id: number;
  username: string;
}


const Admin = () => {
  const { settings, setSettings } = useSettings();
  const [pendingChanges, setPendingChanges] = useState(settings);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);


  const router = useRouter();
  const { logout } = useAuth(); // get login function
  const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'gray', 'cyan',
    'magenta', 'maroon', 'navy', 'olive', 'teal', 'lime', 'aqua', 'fuchsia', 'silver',
    'gold', 'orange'
  ];

  const defaultColors = {
    incomerPower: '#183d33',
    solarPower: '#bd5545',
    water: '#2779a7',
  };

  useEffect(() => {
    // This will only run on the client-side
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    logout();
  };

  const handleChangeColor = (type: ColorType, color: string) => {
    setPendingChanges({
      ...pendingChanges,
      [type]: color,
    });
    // Save to local storage
    localStorage.setItem('settings', JSON.stringify({ ...settings, [type]: color }));
  };

  const renderColorOptions = (type: ColorType): JSX.Element => (
    <div className="flex flex-col mb-5">
      <h3 className='text-black font-bold'>{type} Colour</h3>
      <div className="flex flex-wrap">

        <div
          className='p-2 m-1'
          style={{
            backgroundColor: pendingChanges[type],
            width: '30px',
            height: '30px',
          }}
        ></div>

        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleChangeColor(type, color)}
            className={`p-2 m-1 ${pendingChanges[type] === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    if (token) {
      // Fetch list of administrators
      fetch('http://localhost:8000/api/manage-admins/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setAdmins(data);
      })
      .catch(error => {
        // TODO: Display error message
        console.error("Error fetching admins:", error);
      });
    } else {
      // TODO: Display error message
      console.log("No token found")
    }
  }, [token]);

  const addAdmin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/manage-admins/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json();
        // Update the list of admins
        setAdmins([...admins, data]);
      } else {
        // TODO: Display error message
        console.error("Error adding admin:", response.statusText);
      }
    } catch (error) {
      // TODO: Display error message
      console.error("Error adding admin:", error);
    }
  };


  const removeAdmin = async (id: number) => {
    try {
      const response = await fetch('http://localhost:8000/api/manage-admins/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        // Update the list of admins by removing the deleted one
        setAdmins(admins.filter(admin => admin.id !== id));
      } else {
        // TODO: Display error message
        console.error("Error removing admin:", response.statusText);
      }
    } catch (error) {
      // TODO: Display error message
      console.error("Error removing admin:", error);
    }
  };



  return (
    <div className='mainBlock p-5'>
      <h1 className='mb-5 text-black'>Welcome to the administration page. Here you can modify the data that is displayed on the dashboard as well as the colour scheme.</h1>
      <p className='mb-5 text-black text-xl font-bold'>Adjust colours</p>
      <div className='mb-5'>
        <div
          onClick={() => {
            setSettings(pendingChanges);
            localStorage.setItem('settings', JSON.stringify(pendingChanges));
          }}
          className='applyButton'
        >
          Apply changes
        </div>

        <h2 className='text-black font-bold'>Default Colours:</h2>
        {Object.entries(defaultColors).map(([type, color]) => (
          <div key={type} className="flex items-center mb-2">
            <span className='text-black mr-2'>{type}: </span>
            <button
              onClick={() => handleChangeColor(type as ColorType, color)}
              className={`p-2 ${settings[type as keyof typeof settings] === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
              style={{ backgroundColor: color }}
            >
              {color}
            </button>

          </div>
        ))}

        <h2>Manage Administrators</h2>
        <ul>
          {admins.map(admin => (
            <li key={admin.id}>
              {admin.username}
              <button onClick={() => removeAdmin(admin.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => {
          e.preventDefault();
          addAdmin(newAdminUsername, newAdminPassword);
          setNewAdminUsername(''); // Clear the form
          setNewAdminPassword(''); // Clear the form
        }}>
          <label>
            Username:
            <input
              type="text"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
            />
          </label>
          <button type="submit">Add Admin</button>
        </form>
      </div>

      {renderColorOptions('incomerPower')}
      {renderColorOptions('solarPower')}
      {renderColorOptions('water')}

      <button onClick={handleLogout} className='logoutButton'>Logout</button>
    </div>
  );
}

export default withAdminAuth(Admin);
