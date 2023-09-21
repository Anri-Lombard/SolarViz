// ManageAdmin.tsx

import React from 'react';
import { Admin } from '../types/dataTypes';

import { ManageAdminProps } from '../types/dataTypes';

/**
 * ManageAdmin component manages the list of administrators.
 *
 * @param {ManageAdminProps} props                                        The component's props.
 * @param {Admin[]} props.admins                                          An array of admin objects.
 * @param {(adminId: number) => void} props.removeAdmin                   A function to remove an admin by ID.
 * @param {(username: string, password: string) => void} props.addAdmin   A function to add a new admin.
 * @returns {JSX.Element}                                                 The ManageAdmin component JSX.
 */
// Wanda current password: wanda_solarviz_202x
const ManageAdmin: React.FC<ManageAdminProps> = ({ admins, removeAdmin, addAdmin }) => {
  const [newAdminUsername, setNewAdminUsername] = React.useState('');
  const [newAdminPassword, setNewAdminPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  const [usernameTaken, setUsernameTaken] = React.useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isUsernameTaken = admins.some(admin => admin.username === newAdminUsername);
    if (isUsernameTaken) {
      setUsernameTaken(true);
      return;
    } else {
      setUsernameTaken(false);
    }

    if (newAdminPassword === confirmPassword) {
      setPasswordsMatch(true);
      addAdmin(newAdminUsername, newAdminPassword);
      setNewAdminUsername('');
      setNewAdminPassword('');
      setConfirmPassword('');
    } else {
      setPasswordsMatch(false);
    }
  };


  return (
    <div className="adminList">
      <ul>
        {admins.map(admin => (
          <li key={admin.id}>
            {admin.username}
            {admin.username !== "wanda_majikijela" && (
              <button data-testid="removeAdmin" onClick={() => removeAdmin(admin.id)}>Remove</button>
            )}
          </li>
        ))}

      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className='submitForm'>
          <label>
            Username:
          </label>
          <input
            type="text"
            value={newAdminUsername}
            onChange={(e) => setNewAdminUsername(e.target.value)}
            placeholder="New admin username"
          />

          <label>
            Password:
          </label>
          <input
            type="password"
            value={newAdminPassword}
            onChange={(e) => setNewAdminPassword(e.target.value)}
            placeholder="New admin password"
          />

          <label>
            Confirm Password:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />

          {!passwordsMatch && <div className='adminErrorMessage'>Passwords should match</div>}
          {usernameTaken && <div className='adminErrorMessage'>Username already taken</div>}
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default ManageAdmin;
