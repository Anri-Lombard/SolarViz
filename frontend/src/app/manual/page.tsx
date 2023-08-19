import React from 'react';
import '../styles/Manual.css'

export default function Manual() {
  return (
    <div className='manualContainer'>
      <div className='tableOfContents'>
        <a href='#description'>Description</a>
        <a href='#settings'>Settings</a>
        <a href='#administration'>Administration</a>
        <a href='#contribution'>Contribution</a>
      </div>
      <div className='content'>
        <div id='description'>
          <h2>Description</h2>
          <p>This section provides an overview of the application, its features, and its purpose.</p>
        </div>
        <div id='settings'>
          <h2>Settings</h2>
          <p>This section explains how to configure the application, including user preferences, system settings, and more.</p>
        </div>
        <div id='administration'>
          <h2>Administration</h2>
          <p>This section provides information on managing user accounts, security settings, and other administrative tasks.</p>
        </div>
        <div id='contribution'>
          <h2>Contribution</h2>
          <p>This section is for developers who want to contribute to the code. It includes guidelines for submitting pull requests, reporting issues, and collaborating on development.</p>
        </div>
      </div>
    </div>
  );
}
