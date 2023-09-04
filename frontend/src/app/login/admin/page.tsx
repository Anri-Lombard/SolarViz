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
  const [changesAppliedMessage, setChangesAppliedMessage] = useState<string | null>(null);

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
    // Fetch list of administrators when the component mounts or the token changes
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/manage-admins/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          console.error("Error fetching admins:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    if (token) {
      fetchAdmins();
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
        // Force a re-fetch of the admin list
        const fetchAdmins = async () => {
          const res = await fetch('http://localhost:8000/api/manage-admins/', {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          const data = await res.json();
          setAdmins(data);
        };
        fetchAdmins();
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
        setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));  // Use functional update
      } else {
        // TODO: Display error message
        console.error("Error removing admin:", response.statusText);
      }
    } catch (error) {
      // TODO: Display error message
      console.error("Error removing admin:", error);
    }
  };

  const showChangesAppliedMessage = () => {
    setChangesAppliedMessage('Changes applied');
    setTimeout(() => {
      setChangesAppliedMessage(null); // Hide the message after a few seconds
    }, 500);
  };
  

  return (
    <div>

      <div className='intro'>
      <p>Welcome to the administration page. Adjust the colour schemes of the graphs displayed, 
        select the content to be displayed on the main dashboard, or manage the administrators. Select one of the options below.</p>

      <nav>
        <ul className= 'hover=underline' style={{ paddingTop: '10px' }}>
          <li><a href="#adjust-colours">Adjust Colours</a></li>
          <li><a href="#select-content">Select dashboard content</a></li>
          <li><a href="#manage-admins">Manage Administrators</a></li>
        </ul>
      </nav>
      </div>

      <div id="adjust-colours" className='mb-5 adminBlock' >

        <h2>Adjust colours</h2>
        <div className='mb-5'>

        <div
          onClick={() => {
            setSettings(pendingChanges);
            localStorage.setItem('settings', JSON.stringify(pendingChanges));
            showChangesAppliedMessage();
          }}
          className='applyButtonContainer'
        >
          <div className='applyButton'>Apply changes</div>
          {changesAppliedMessage && <div className="changesAppliedMessage">{changesAppliedMessage}</div>}
        </div>

          <h1 className='text-black font-bold'>Default Colours:</h1>
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
        </div>
      {renderColorOptions('incomerPower')}
      {renderColorOptions('solarPower')}
      {renderColorOptions('water')}

      </div> 

      <div id="select-content" className='mb-5 adminBlock'>
        <h2> Select graphs to be displayed on the main dashboard</h2>
      </div>

      <div id="manage-admins" className='mb-5 adminBlock'>
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
              placeholder="New admin username"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              placeholder="New admin password"
            />
          </label>
          <button type="submit">Add Admin</button>
        </form>
      </div>

      <button onClick={handleLogout} className='logoutButton'>Logout</button>
    </div>
  );
}

export default withAdminAuth(Admin);
