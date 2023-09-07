// ManageAdmin.tsx

import React from 'react';
import { Admin } from '../types/dataTypes';

import { ManageAdminProps } from '../types/dataTypes';

const ManageAdmin: React.FC<ManageAdminProps> = ({ admins, removeAdmin, addAdmin }) => {
  const [newAdminUsername, setNewAdminUsername] = React.useState('');
  const [newAdminPassword, setNewAdminPassword] = React.useState('');

  return (
    <div>
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
  );
};

export default ManageAdmin;
