"use client"

import withAdminAuth from '../../components/WithAdminAuth';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '../../contexts/SettingsContext';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/LoginContext';
import '../../styles/Admin.css';
import ColorOptions from '../../components/ColorOptions';
import GraphSettingsComponent from '../../components/GraphSettings';
import ManageAdmin from '../../components/ManageAdmins';
import MediaSettingsComponent from '../../components/MediaSettingsComponent';

import { Admin, ColorType, ChartType, ColorSettings } from '../../types/dataTypes'

/**
 * Component for the administrator dashboard.
 */

const Admin = () => {
  const { settings, setSettings } = useSettings();
  const {
    videoList,
    selectedVideo,
    setSelectedVideo,
    uploadVideo,
    videoUrl,
  } = useData();
  // console.log(settings)
  const [pendingChanges, setPendingChanges] = useState({
    ...settings,
  });
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [pendingGraphSettings, setPendingGraphSettings] = useState({
    pieChart: settings.pieChart,
    areaChart: settings.areaChart,
    lineChart: settings.lineChart,
  });
  const [pendingMediaSettings, setPendingMediaSettings] = useState({
    sequence: settings.media.sequence,
    display: settings.media.display,
    audio: settings.media.audio,
  });


  const [graphSettingsError, setGraphSettingsError] = useState<string | null>(null);

  const router = useRouter();
  const { logout } = useAuth(); // get login function
  const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'gray', 'cyan',
    'magenta', 'maroon', 'navy', 'olive', 'teal', 'lime', 'aqua', 'fuchsia', 'silver',
    'gold', 'orange', '#183D33', '#BD5545', '#00FF00', '#0000FF', '#009099', '#FF00FF',
    '#00FFFF', '#800000', '#008000', '#000080', '#808000'
  ];


  const defaultColors = {
    'Incomer Power': '#183D33',
    'Solar Power': '#BD5545',
    'Secondary Storey Kitchen': '#00FF00',
    'Second Storey Toilet': '#0000FF',
    'Second Storey Ablution': '#009099',
    'Ground Storey Toilet': '#FF00FF',
    'Ground Storey Hot Ablution': '#00FFFF',
    'Ground Storey Geyser': '#800000',
    'Ground Storey Cold Ablution': '#008000',
    'First Storey Toilet': '#000080',
    'First Storey Ablution': '#808000',
  };

  /**
  * Function to validate graph settings.
  * @returns True if graph settings are valid, false otherwise.
  */

  const validateGraphSettings = () => {
    const sequenceNumbers = Object.values(pendingGraphSettings)
      .map(setting => setting.sequence)
      .filter(sequence => sequence !== 0); //filter out undisplayed graphs

    if (pendingMediaSettings.display) { // add media settings sequence to be considered in rotation
      sequenceNumbers.push(pendingMediaSettings.sequence)
    }

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

  /**
   * Function to handle graph settings change.
   * @param chartType   The type of chart (e.g., 'pieChart', 'areaChart').
   * @param field       The field within the chart settings to change.
   * @param value       The new value to set.
   */

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
  }, [router]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      router.push('/login');
      logout();
    }
  };

  /**
   * Function to handle color change.
   * @param type    The type of color to change (e.g., 'incomerPower', 'solarPower').
   * @param color   The new color value.
   */

  const handleChangeColor = (type: ColorType, color: string) => {
    setPendingChanges({
      ...pendingChanges,
      colors: {
        ...pendingChanges.colors,
        [type]: color,
      },
    });
  };

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

  /**
   * Function to add an administrator.
   * @param username  The username of the administrator.
   * @param password  The password of the administrator.
   */

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

  /**
   * Function to remove an administrator.
   * @param id  The ID of the administrator to remove.
   */

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

  /**
   * Function to apply color changes.
   */

  const applyColorChanges = () => {
    if (window.confirm("Are you sure you want to apply color changes?")) {
      const newSettings = {
        ...settings,
        colors: {
          'Incomer Power': pendingChanges.colors['Incomer Power'],
          'Solar Power': pendingChanges.colors['Solar Power'],
          'Secondary Storey Kitchen': pendingChanges.colors['Secondary Storey Kitchen'],
          'Second Storey Toilet': pendingChanges.colors['Second Storey Toilet'],
          'Second Storey Ablution': pendingChanges.colors['Second Storey Ablution'],
          'Ground Storey Toilet': pendingChanges.colors['Ground Storey Toilet'],
          'Ground Storey Hot Ablution': pendingChanges.colors['Ground Storey Hot Ablution'],
          'Ground Storey Geyser': pendingChanges.colors['Ground Storey Geyser'],
          'Ground Storey Cold Ablution': pendingChanges.colors['Ground Storey Cold Ablution'],
          'First Storey Toilet': pendingChanges.colors['First Storey Toilet'],
          'First Storey Ablution': pendingChanges.colors['First Storey Ablution'],
        }
      };

      if (token) {
        setSettings(newSettings, token); // Update global settings
      } else {
        // TODO: Handle unauthorized access
      }
    }
  };

  /**
   * Function to apply graph settings changes.
   */

  const applyGraphSettingsChanges = () => {
    if (validateGraphSettings()) {
      if (window.confirm("Are you sure you want to apply graph settings changes?")) {
        const newSettings = {
          ...settings,
          pieChart: pendingGraphSettings.pieChart,
          areaChart: pendingGraphSettings.areaChart,
          lineChart: pendingGraphSettings.lineChart,
          media: pendingMediaSettings,
        };
        if (token) {
          setSettings(newSettings, token); // Update global settings
        } else {
          // TODO: Handle unauthorized access
        }
      }
    }

  };

  /**
   * Function to handle media settings change.
   * @param field   The field within the media settings to change.
   * @param value   The new value to set.
   */

  const handleMediaSettingsChange = (field: string, value: number | boolean) => {
    setPendingMediaSettings({
      ...pendingMediaSettings,
      [field]: value,
    });
  };

  const handleScroll = (event: React.MouseEvent, sectionId: string, offset = -80) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const position = element.offsetTop + offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div data-testid="adminPage">

      <div className='intro'>
        <p>Welcome to the administration page. Adjust the colour schemes of the graphs displayed,
          select the content to be displayed on the main dashboard, or manage the administrators. Select one of the options below:</p>

        <nav className='navContainer'>
          <ul style={{ paddingTop: '10px' }}>
            <li><a href="#select-content-and-media" onClick={(e) => handleScroll(e, 'select-content-and-media')}>Select dashboard content</a></li>
            <li><a href="#adjust-colors" onClick={(e) => handleScroll(e, 'adjust-colors')}>Adjust Colours</a></li>
            <li><a href="#manage-admins" onClick={(e) => handleScroll(e, 'manage-admins')}>Manage Administrators</a></li>
          </ul>
        </nav>
      </div>

      <div id="select-content-and-media" className='adminBlock'>
        <h2> Select graphs to be displayed on the main dashboard</h2>

        <div
          onClick={applyGraphSettingsChanges}
        >
          <div className='applyButton'>Apply Graph Settings</div>
        </div>

        <div>
          {graphSettingsError && <div className="errorMessage">{graphSettingsError}</div>}
          <div className='selectionBlock'>
            {(['pieChart', 'areaChart', 'lineChart'] as ChartType[]).map((chartType) => (
              <GraphSettingsComponent
                key={chartType}
                chartType={chartType}
                handleGraphSettingsChange={handleGraphSettingsChange}
                settings={pendingGraphSettings}
              />
            ))}

            <MediaSettingsComponent
              handleMediaSettingsChange={handleMediaSettingsChange}
              settings={pendingMediaSettings}
              videoList={videoList}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              uploadVideo={uploadVideo}
            />
          </div>

        </div>

      </div>

      <div id="adjust-colors" className='adminBlock'>
        <h2>Adjust colours</h2>
        <div>
          <div
            onClick={applyColorChanges}
          >
            <div className='applyButton'>Apply Color Changes</div>
          </div>

          <h1 className='text-black font-bold'>Default Colours:</h1>
          <div className='colorGrid'>
            {Object.entries(defaultColors).map(([type, color]) => (
              <div key={type} className="defaultColorGridElement">
                <span className='text-black mr-2'>{type}: </span>
                <button
                  onClick={() => handleChangeColor(type as ColorType, color)}
                  className={`p-2`}
                  style={{ backgroundColor: color }}
                >
                  {color}
                </button>
              </div>
            ))}
          </div>
          <h1 className='text-black font-bold'>Choose your graph colours:</h1>
          <div className='colorGrid'>
            {(Object.keys(pendingChanges.colors) as Array<ColorType>).map((type) => {
              return (
                <ColorOptions
                  key={type}
                  type={type}
                  colors={colors}
                  handleChangeColor={handleChangeColor}
                  // @ts-ignore
                  currentColor={(pendingChanges.colors as any)[type]}

                />
              );
            })}
          </div>

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
