"use client"

import React from 'react';

export default function Manual() {
  return (
    <div className='flex h-screen bg-gray-200 p-10 mt-32 mb-20 mainBlock'>
      <div className='w-64 flex flex-col mr-6'>
        <h2 className='text-xl font-bold mb-4'>Table of Contents</h2>
        <a href='#description' className='text-blue-500 hover:underline mb-2'>Description</a>
        <a href='#settings' className='text-blue-500 hover:underline mb-2'>Settings</a>
        <a href='#administration' className='text-blue-500 hover:underline mb-2'>Administration</a>
        <a href='#contribution' className='text-blue-500 hover:underline mb-2'>Contribution</a>
      </div>
      <div className='flex-1 overflow-auto'>
        <div id='description'>
          <h2 className='text-2xl font-bold mb-2'>Description</h2>
          <p className='mb-4'>This section provides an overview of the application, its features, and its purpose.</p>
        </div>
        <div id='settings'>
          <h2 className='text-2xl font-bold mb-2'>Settings</h2>
          <p className='mb-4'>This section explains how to configure the application, including user preferences, system settings, and more.</p>
        </div>
        <div id='administration'>
          <h2 className='text-2xl font-bold mb-2'>Administration</h2>
          <p className='mb-4'>This section provides information on managing user accounts, security settings, and other administrative tasks.</p>
        </div>
        <div id='contribution'>
          <h2 className='text-2xl font-bold mb-2'>Contribution</h2>
          <p className='mb-4'>This section is for developers who want to contribute to the code. It includes guidelines for submitting pull requests, reporting issues, and collaborating on development.</p>
        </div>
      </div>
    </div>
  );
}