"use client"

import React from 'react';
import '../styles/Manual.css';
import Image from 'next/image';
import { useAuth } from '../contexts/LoginContext';

/**
 * The Manual component displays documentation for SolarViz.
 *
 * @returns {JSX.Element} The JSX for the Manual component.
 */

export default function Manual() {

  const handleScroll = (event: React.MouseEvent, sectionId: string, offset = -100) => {
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

  const { isLoggedIn } = useAuth();

  return (
    <div className='manualContainer'>
      <div className='tableOfContents'>
        <h2 className='text-xl font-bold mb-4'>Table of Contents</h2>
        <a href='#about' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'about')}>About</a>
        <a href='#moreData' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'moreData')}>More Data</a>
        <a href='#administration' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'administration')}>Administration</a>
        {/* <a href='#contribution' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'contribution')}>Contribution</a> */}
      </div>

      <div className='content'>

        <div id='about'>
          <h4>About</h4>
          <div>
            <h2>SolarViz: Powering Sustainability at UCT D-Skool</h2>
            <p>
              SolarViz is a cutting-edge dashboard developed to meticulously monitor and visualize the power and water consumption of the UCT D-Skool building. As a cornerstone of the university&apos;s sustainability initiatives, the D-Skool building is committed to upholding its 6-star green rating. SolarViz is instrumental in this endeavor, offering real-time analytics, historical data, and actionable insights to both the management and the residents.
            </p>

            <h3>Key Features</h3>
            <ul>
              <div  className='icon-textContainer'>
                <Image className="icon" width={300} height={300} src="/images/solarpanel.png" alt = "solarPanel"/>
                <li><strong>Power Visualization</strong>: The dashboard provides a granular view of power consumption, breaking it down into solar and grid contributions. Users can track these metrics over various time frames, and the dashboard also displays the percentage of solar power in the total energy mix.</li>
              </div>

              <div  className='icon-textContainer'>
                <Image className="icon" width={300} height={300} src="/images/water.png" alt = "waterDrop"/>
                <li><strong>Water Data</strong>: SolarViz offers a detailed analysis of water consumption at different points within the building, such as the First Storey Ablution, Ground Storey Geyser, and Second Storey Toilet. Hourly water usage data helps in identifying patterns and implementing water-saving measures.</li>
              </div>

              <div className='icon-textContainer'>
                <Image className="icon" width={300} height={300} src="/images/media.png" alt = "media"/>
                <li><strong>Advertisements and Videos</strong>: The dashboard is equipped with a multimedia section that features advertisements and instructional videos. These resources educate users on best practices for energy and water conservation.</li>
              </div>
              
            </ul>

            <h3>Objective</h3>
            <p>
              The primary objective of SolarViz is to foster a culture of transparency and accountability around sustainability within the UCT D-Skool building. By making power and water usage data easily accessible and understandable, SolarViz empowers residents and management to make informed decisions. This, in turn, aids in the continuous improvement of the building&apos;s sustainability metrics, ensuring the maintenance of its 6-star green rating.
            </p>

            <h3>Who Can Benefit?</h3>
            <p>
              SolarViz is designed for a wide range of users, including building management, residents, sustainability researchers, and even visitors who are interested in understanding the building&apos;s green initiatives. Its user-friendly interface and robust features make it a versatile tool for anyone invested in sustainability.
            </p>
          </div>
        </div>


        <div id='moreData'>
          <h4>More data</h4>
          <h2 id="overview">Overview</h2>
          <p>
            The More Data page is designed to provide a comprehensive view of both power and water data. This guide will walk you through the various components and functionalities of the page.
          </p>

          <h2 id="data-fetching">Data Fetching</h2>
          <p>
            The More Data page fetches real-time power and water data from the server. This data is then used to populate the various charts and graphs on the page. The fetching process is automatic and happens when the page loads.
          </p>

          <h2 id="display-components">Display Components</h2>
          <p>
            The More Data page consists of the following main components:
          </p>
          <ul>
          <div className='icon-textContainer'>
            <Image className="icon" height={300} width={300} src="/images/piechart.png" alt = "pieChart"/>
            <li><strong>Pie Chart:</strong> Shows the percentage of energy coming from solar and incomer sources.</li>
          </div>

          <div className='icon-textContainer'>
            <Image className="icon" height={300} width={300} src="/images/areachart.png" alt = "areaChart"/>
            <li><strong>Stacked Area Chart:</strong> Displays power data over time, broken down by different metrics.</li>
          </div>

          <div className='icon-textContainer'>
            <Image className="icon" height={300} width={300} src="/images/linechart.png" alt = "lineChart"/>
            <li><strong>Stacked Line Chart:</strong> Represents water data over time, segmented by meter description.</li>
          </div>
          </ul>

          <h2 id="user-interactions">User Interactions</h2>
          <p>
            Users can interact with the More Data page in the following ways:
          </p>
          <ul>
            <li><strong>Filtering:</strong> Users can apply various filters to customize the data displayed on the charts.</li>
            <li><strong>Duration:</strong> Users can select the time duration for which they want to view the data.</li>
            <li><strong>Show/Hide Metrics:</strong> Options to show or hide additional metrics like irradiance, forecast, and performance metrics are available.</li>
          </ul>
        </div>

        <div id='administration'>
          <h4>Administration</h4>
          {isLoggedIn ? (
            <div >
              <p className='mb-4'>
                Here, you&apos;ll discover a range of powerful tools that empower you as an administrator. From selecting and customizing graphs
                to managing media, adjusting colours, and handling administrators, you have the ability to streamline and optimize your system with ease. 
              </p>

              <div>
                <h3>Selecting dashboard content</h3>
                <Image height={300} width={300} src="/images/screenshots/selectDashboardContent.png" alt = "selectContent"/>
                <ol>
                  <li><strong>Graph Display:</strong> Pick the graphs you want to see by checking their checkboxes. It&apos;s all about having the information that matters most to you.</li>
                  <li><strong>Graph Configuration:</strong> If you select a graph, you can customize it further. Set the sequence number to control its order and decide how long it stays on the screen by adjusting the duration.</li>
                  <li><strong>Sequence Number Validation:</strong> Keep your sequence numbers in order. If they&apos;re not consecutive, you will see an error message saying, &quot;Sequence numbers must follow each other.&quot;</li>
                  <li><strong>Unique Sequence Numbers:</strong> Each graph needs its own special sequence number. Avoid duplicates to prevent an error message saying, &quot;Sequence numbers must be unique.&quot;</li>
                  <li><strong>Duration Requirement:</strong> Make sure each graph is visible for more than 10 seconds. This gives viewers enough time to absorb the information and grasp its meaning.</li>
                  <li><strong>Selecting Media:</strong> This function works similarly to selecting graphs. You can also choose whether videos play with sound or without sound, giving you control over your media experience.</li>
                  <li>When you&apos;re ready to apply all the changes you&apos;ve made to the graphs and media selections, simply click on the &quot;Apply Changes&quot; button. This will update your dashboard with the new configurations you&apos;ve chosen.</li>
                </ol>
              </div>

              <div>
                <h3>Adjusting colours</h3>
                <Image height={300} width={300} src="/images/screenshots/defaultColours.png" alt = "defaultColours"/>
                <ol>
                  <li><strong>Default Colours:</strong> In this section, the default colours for all graph variables are displayed.
                    If you wish to revert back to the default colours, simply click on one of the provided buttons.</li>
                </ol>

                <Image height={300} width={300} src="/images/screenshots/customColours.png" alt = "customColours"/>
                <ol>
                  <li><strong>Custom Colours:</strong> Select custom colours for each variable using the drop-down menus associated with each variable. As you make colour selections,
                    a preview of the chosen colour will be displayed next to the respective drop-down menu.</li>
                  <li>Once you are happy with the selection, click the &quot;Apply Changes&quot; button. This will implement the
                    new colour scheme for the graph variables.</li>
                </ol>
              </div>

              <div>
                <h3>Manage administrators</h3>
                <ol>
                  <li>Within this section, you can easily view the current list of administrators and remove them if necessary. 
                    If you need to add a new administrator, just enter a new username and password, confirm the password,
                    then click &quot;Apply&quot;. Your new admin login will be securely integrated into the system</li>
                </ol>
              </div>
            </div>
          ) : (
            <div>
              {/* Render content when isLoggedIn is false */}
              <ol>
                <li>Please log in to access this section.</li>
              </ol>
              {/* Additional content for non-logged-in users */}
            </div>
          )}
        </div>

        {/* <div id='contribution'>
          <h4>Contribution</h4>
          <div className='contribution'>
            <a href="https://www.flaticon.com/free-icons/line-chart" title="line chart icons">Line chart icons created by ibobicon - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/area-chart" title="area chart icons">Area chart icons created by Ajmal Naha - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/piechart" title="piechart icons">Piechart icons created by Lagot Design - Flaticon</a>
          </div>
        </div> */}
      </div>
      <div className='footerText'>
        <p>© 2023 SolarViz. All rights reserved.</p>
      </div>
    </div>
  );
}