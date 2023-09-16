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

  return (
    <div>
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
  );
};

export default ManageAdmin;
