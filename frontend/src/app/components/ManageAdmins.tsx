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

const ManageAdmin: React.FC<ManageAdminProps> = ({ admins, removeAdmin, addAdmin }) => {
  const [newAdminUsername, setNewAdminUsername] = React.useState('');
  const [newAdminPassword, setNewAdminPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <button data-testid="removeAdmin" onClick={() => removeAdmin(admin.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className='submitForm'>
          <label className='submitTextAndInput'>
            Username:
            <input
              type="text"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
              placeholder="New admin username"
            />
          </label>
          <label className='submitTextAndInput'>
            Password:
            <input
              type="password"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              placeholder="New admin password"
            />
          </label>
          <label className='submitTextAndInput'>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </label>
          {!passwordsMatch && <div className='adminErrorMessage'>Passwords should match</div>}
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default ManageAdmin;
