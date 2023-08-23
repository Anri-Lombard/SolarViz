"use client"

import React from 'react';

export default function Manual() {
  return (
    <div className='flex h-screen bg-gray-200 p-10 mt-32 mb-20 mainBlock'>
      <div className='w-64 flex flex-col mr-6'>
        <h2 className='text-xl font-bold mb-4'>Table of Contents</h2>
        <a href='#about' className='text-blue-500 hover:underline mb-2'>About</a>
        <a href='#settings' className='text-blue-500 hover:underline mb-2'>Settings</a>
        <a href='#administration' className='text-blue-500 hover:underline mb-2'>Administration</a>
        <a href='#contribution' className='text-blue-500 hover:underline mb-2'>Contribution</a>
      </div>
      <div className='flex-1 overflow-auto'>
        <div id='about'>
          <h2 className='text-2xl font-bold mb-2'>About</h2>
          <p className='mb-4'>
            <h2>SolarViz: Powering Sustainability at UCT D-Skool</h2>
            <h3>Introduction</h3>
            <p>SolarViz is an innovative dashboard designed to monitor and visualize the power and water usage of the UCT D-Skool building. As a part of the university's commitment to sustainability, the D-Skool building aims to maintain its 6-star green rating. SolarViz plays a crucial role in achieving this goal by providing real-time insights and actionable data.</p>
            <h3>1. Visualization of Power Usage</h3>
            <ul>
              <li><strong>Real-Time Monitoring</strong>: SolarViz offers a live view of the building's energy consumption, breaking down the usage by floors, rooms, and individual appliances. This granular view helps in identifying energy-hungry areas and devices.</li>
              <li><strong>Historical Data Analysis</strong>: Users can access historical data to analyze trends and patterns in energy consumption. This feature assists in forecasting future energy needs and planning accordingly.</li>
              <li><strong>Renewable Energy Integration</strong>: SolarViz integrates data from solar panels and other renewable energy sources, showcasing how much energy is being generated and consumed from sustainable sources.</li>
              <li><strong>Energy Efficiency Recommendations</strong>: The dashboard provides personalized recommendations to reduce energy consumption, such as optimizing lighting and HVAC systems.</li>
            </ul>
            <h3>2. Visualization of Water Usage</h3>
            <ul>
              <li><strong>Water Consumption Tracking</strong>: SolarViz monitors water usage throughout the building, including restrooms, kitchens, and outdoor irrigation systems. This tracking helps in detecting leaks and overuse.</li>
              <li><strong>Water Recycling Insights</strong>: The dashboard displays information about water recycling and rainwater harvesting, contributing to the building's water conservation efforts.</li>
              <li><strong>Water Efficiency Goals</strong>: Users can set and track water-saving goals, encouraging responsible water usage across the building.</li>
            </ul>
            <h3>3. Collaboration with Building Management Systems</h3>
            <ul>
              <li><strong>Integration with Building Controls</strong>: SolarViz seamlessly integrates with existing building management systems, allowing facility managers to control and optimize energy and water usage directly from the dashboard.</li>
              <li><strong>Alerts and Notifications</strong>: The system sends alerts for unusual consumption patterns or system malfunctions, enabling quick response and minimizing waste.</li>
              <li><strong>Customizable Reports</strong>: Facility managers can generate customized reports for different stakeholders, ensuring that everyone is aligned with the building's sustainability goals.</li>
            </ul>
            <h3>4. User Engagement and Education</h3>
            <ul>
              <li><strong>Interactive Interface</strong>: SolarViz offers an engaging and user-friendly interface that encourages occupants to explore and understand their impact on the building's sustainability.</li>
              <li><strong>Educational Content</strong>: The dashboard includes educational materials about green practices and how individual actions contribute to the building's 6-star rating.</li>
              <li><strong>Community Engagement</strong>: SolarViz fosters a sense of community by allowing users to share achievements and challenges, promoting a collective effort towards sustainability.</li>
            </ul>
            <h3>Conclusion</h3>
            <p>SolarViz is more than just a monitoring tool; it's a comprehensive platform that empowers the UCT D-Skool building to stay at the forefront of sustainability. By visualizing power and water usage, integrating with building systems, and engaging users, SolarViz ensures that the D-Skool building continues to be a beacon of environmental responsibility.</p>
            <p>By utilizing SolarViz, the UCT D-Skool building not only maintains its prestigious 6-star green rating but also sets a standard for sustainable practices that can inspire other institutions. It's a step towards a greener future, where technology and awareness go hand in hand to create a sustainable and responsible environment.</p>
          </p>
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