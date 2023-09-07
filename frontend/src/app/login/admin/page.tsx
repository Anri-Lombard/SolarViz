"use client"

import withAdminAuth from '../../components/WithAdminAuth';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/LoginContext';
import '../../styles/Admin.css';
import ColorOptions from '../../components/ColorOptions';
import GraphSettingsComponent from '../../components/GraphSettings';
import ManageAdmin from '../../components/ManageAdmins';

import { Admin, ColorType, ChartType } from '../../types/dataTypes'


const Admin = () => {
  const { settings, setSettings } = useSettings();
  const [pendingChanges, setPendingChanges] = useState(settings);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [changesAppliedMessage, setChangesAppliedMessage] = useState<string | null>(null);
  const [pendingGraphSettings, setPendingGraphSettings] = useState({
    pieChart: settings.pieChart,
    areaChart: settings.areaChart,
    lineChart: settings.lineChart,
  });
  const [graphSettingsError, setGraphSettingsError] = useState<string | null>(null);


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

  const validateGraphSettings = () => {
    const sequenceNumbers = Object.values(pendingGraphSettings).map(setting => setting.sequence);
    const uniqueSequenceNumbers = new Set(sequenceNumbers);

    // Check if a sequence number is chosen twice
    if (sequenceNumbers.length !== uniqueSequenceNumbers.size) {
      setGraphSettingsError("Sequence numbers must be unique.");
      return false;
    }

    // Check if sequence numbers follow each other
    const sortedSequenceNumbers = sequenceNumbers.sort((a, b) => a - b);
    for (let i = 0; i < sortedSequenceNumbers.length - 1; i++) {
      if (sortedSequenceNumbers[i + 1] - sortedSequenceNumbers[i] !== 1) {
        setGraphSettingsError("Sequence numbers must follow each other.");
        return false;
      }
    }

    // Check if at least one graph is displayed
    const isAnyGraphDisplayed = Object.values(pendingGraphSettings).some(setting => setting.display);
    if (!isAnyGraphDisplayed) {
      setGraphSettingsError("At least one graph must be displayed.");
      return false;
    }

    // Check if duration for each displayed graph is at least 10 seconds
    const isDurationValid = Object.values(pendingGraphSettings).every(setting => !setting.display || setting.duration >= 10);
    if (!isDurationValid) {
      setGraphSettingsError("Duration for each displayed graph must be more than 10 seconds.");
      return false;
    }

    // If all checks pass
    setGraphSettingsError(null);
    return true;
  };

  const handleGraphSettingsChange = (chartType: ChartType, field: string, value: number | boolean) => {
    setPendingGraphSettings({
      ...pendingGraphSettings,
      [chartType]: {
        ...pendingGraphSettings[chartType],
        [field]: value,
      },
    });
  };


  useEffect(() => {
    // This will only run on the client-side
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      router.push('/login');
      logout();
    }
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
    if (window.confirm(`Are you sure you want to add ${username} as an admin?`)) {

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
    }
  };


  const removeAdmin = async (id: number) => {
    if (window.confirm(`Are you sure you want to remove this admin?`)) {

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
    }
  };

  const showChangesAppliedMessage = () => {
    setChangesAppliedMessage('Changes applied');
    setTimeout(() => {
      setChangesAppliedMessage(null);
    }, 1000);
  };

  const applyColorChanges = () => {
    if (window.confirm("Are you sure you want to apply color changes?")) {
      const newSettings = {
        ...settings,
        incomerPower: pendingChanges.incomerPower,
        solarPower: pendingChanges.solarPower,
        water: pendingChanges.water,
      };
      if (token) {
        setSettings(newSettings, token); // Update global settings
        showChangesAppliedMessage();
      } else {
        // TODO: Handle unauthorized access
      }
    }
  };

  const applyGraphSettingsChanges = () => {
    if (validateGraphSettings()) {
      if (window.confirm("Are you sure you want to apply graph settings changes?")) {
        const newSettings = {
          ...settings,
          pieChart: pendingGraphSettings.pieChart,
          areaChart: pendingGraphSettings.areaChart,
          lineChart: pendingGraphSettings.lineChart,
        };
        if (token) {
          setSettings(newSettings, token); // Update global settings
          showChangesAppliedMessage();
        } else {
          // TODO: Handle unauthorized access
        }
      }
    }
  };


  return (
    <div>

      <div className='intro'>
        <p>Welcome to the administration page. Adjust the colour schemes of the graphs displayed,
          select the content to be displayed on the main dashboard, or manage the administrators. Select one of the options below.</p>

        <nav>
          <ul className='hover=underline' style={{ paddingTop: '10px' }}>
            <li><a href="#select-content">Select dashboard content</a></li>
            <li><a href="#select-media">Select media</a></li>
            <li><a href="#adjust-colours">Adjust Colours</a></li>
            <li><a href="#manage-admins">Manage Administrators</a></li>
          </ul>
        </nav>
      </div>

        <div id="select-content" className='mb-5 adminBlock'>
          <h2> Select graphs to be displayed on the main dashboard</h2>

          <div
            onClick={applyGraphSettingsChanges}
            className='applyGraphSettingsButtonContainer'
          >
            <div className='applyGraphSettingsButton'>Apply Graph Settings Changes</div>
            {changesAppliedMessage && <div className="changesAppliedMessage">{changesAppliedMessage}</div>}
          </div>

          <div className='selectionBlock'>
            {graphSettingsError && <div className="errorMessage">{graphSettingsError}</div>}

            {(['pieChart', 'areaChart', 'lineChart'] as ChartType[]).map((chartType) => (
              <GraphSettingsComponent
                key={chartType}
                chartType={chartType}
                handleGraphSettingsChange={handleGraphSettingsChange}
                settings={pendingGraphSettings}
              />
            ))}

          </div>
        </div>

        <div id="select-media" className='mb-5 adminBlock'>
          <h2> add section for selecting whether video plays or not</h2>
        </div>

        <div id="adjust-colours" className='mb-5 adminBlock' >

          <h2>Adjust colours</h2>
          <div className='mb-5'>

            <div
              onClick={applyColorChanges}
              className='applyButtonContainer'
            >
              <div className='applyButton'>Apply Color Changes</div>
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

            {(['incomerPower', 'solarPower', 'water'] as ColorType[]).map((type) => (
              <ColorOptions
                key={type}
                type={type}
                colors={colors}
                handleChangeColor={handleChangeColor}
                currentColor={pendingChanges[type]}
              />
            ))}


          </div>
        </div>

        <div id="manage-admins" className='mb-5 adminBlock'>
          <h2>Manage Administrators</h2>
          <ManageAdmin admins={admins} removeAdmin={removeAdmin} addAdmin={addAdmin} />
          
        </div>
        
        <button onClick={handleLogout} className='logoutButton'>Logout</button>
    </div>
  );
}

export default withAdminAuth(Admin);
