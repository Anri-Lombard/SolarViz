"use client"

import React from 'react';
import '../styles/Manual.css';

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
          <div className='mb-4'>
            <h2>SolarViz: Powering Sustainability at UCT D-Skool</h2>
            <p>
              SolarViz is a cutting-edge dashboard developed to meticulously monitor and visualize the power and water consumption of the UCT D-Skool building. As a cornerstone of the university's sustainability initiatives, the D-Skool building is committed to upholding its 6-star green rating. SolarViz is instrumental in this endeavor, offering real-time analytics, historical data, and actionable insights to both the management and the residents.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li><strong>Power Visualization</strong>: The dashboard provides a granular view of power consumption, breaking it down into solar and grid contributions. Users can track these metrics over various time frames, and the dashboard also displays the percentage of solar power in the total energy mix.</li>
              <li><strong>Water Data</strong>: SolarViz offers a detailed analysis of water consumption at different points within the building, such as the First Storey Ablution, Ground Storey Geyser, and Second Storey Toilet. Hourly water usage data helps in identifying patterns and implementing water-saving measures.</li>
              <li><strong>Advertisements and Videos</strong>: The dashboard is equipped with a multimedia section that features advertisements and instructional videos. These resources educate users on best practices for energy and water conservation.</li>
            </ul>

            <h3>Objective</h3>
            <p>
              The primary objective of SolarViz is to foster a culture of transparency and accountability around sustainability within the UCT D-Skool building. By making power and water usage data easily accessible and understandable, SolarViz empowers residents and management to make informed decisions. This, in turn, aids in the continuous improvement of the building's sustainability metrics, ensuring the maintenance of its 6-star green rating.
            </p>

            <h3>Who Can Benefit?</h3>
            <p>
              SolarViz is designed for a wide range of users, including building management, residents, sustainability researchers, and even visitors who are interested in understanding the building's green initiatives. Its user-friendly interface and robust features make it a versatile tool for anyone invested in sustainability.
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
            <li><strong>Pie Chart:</strong> Shows the percentage of energy coming from solar and incomer sources.</li>
            <li><strong>Stacked Area Chart:</strong> Displays power data over time, broken down by different metrics.</li>
            <li><strong>Stacked Line Chart:</strong> Represents water data over time, segmented by meter description.</li>
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
          <h2 id="overview">Overview</h2>
          <p>The Administration page allows you to customize various aspects of the application, including the content displayed on the main dashboard, the color schemes of graphs, and the list of administrators. This guide will walk you through each section and its functionalities.</p>

          <h2 id="dashboard-content-selection">Dashboard Content Selection</h2>
          <h3>How to Access</h3>
          <ul>
            <li>Navigate to the "Select graphs to be displayed on the main dashboard" section.</li>
          </ul>
          <h3>Features</h3>
          <ul>
            <li><strong>Apply Graph Settings</strong>: Click this button to save any changes made to the graph settings.</li>
            <li><strong>Graph Settings</strong>: Customize the settings for Pie Chart, Area Chart, and Line Chart. You can set the sequence, display status, and duration for each chart type.</li>
            <li><strong>Media Settings</strong>: Configure the media settings, including sequence, display, and audio options.</li>
          </ul>
          <h3>Validation</h3>
          <ul>
            <li>Sequence numbers must be unique and consecutive.</li>
            <li>At least one graph must be displayed.</li>
            <li>Duration for each displayed graph must be more than 10 seconds.</li>
          </ul>

          <h2 id="color-adjustment">Color Adjustment</h2>
          <h3>How to Access</h3>
          <ul>
            <li>Navigate to the "Adjust colours" section.</li>
          </ul>
          <h3>Features</h3>
          <ul>
            <li><strong>Apply Color Changes</strong>: Click this button to save any changes made to the color settings.</li>
            <li><strong>Default Colors</strong>: Quickly set colors to their default values.</li>
            <li><strong>Custom Colors</strong>: Choose custom colors for different metrics like incomer power, solar power, and various water-related metrics.</li>
          </ul>

          <h2 id="manage-administrators">Manage Administrators</h2>
          <h3>How to Access</h3>
          <ul>
            <li>Navigate to the "Manage Administrators" section.</li>
          </ul>
          <h3>Features</h3>
          <ul>
            <li><strong>Add Admin</strong>: Add a new administrator by entering a username and password.</li>
            <li><strong>Remove Admin</strong>: Remove an existing administrator from the list.</li>
          </ul>

          <h2 id="logout">Logout</h2>
          <p>Click the "Logout" button to log out of the administration interface.</p>

        </div>
        {/* <div id='contribution'>
          <h4>Contribution</h4>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper, nunc et pellentesque facilisis, sapien nisl egestas diam, nec blandit elit metus ac erat. Fusce non bibendum dui. Vivamus commodo, sem et sollicitudin malesuada, est quam ultrices orci, a semper augue mauris ut quam.

            Phasellus finibus, mauris a efficitur aliquet, nulla massa venenatis nisl, id efficitur orci nunc at nulla. Proin non bibendum metus. Aenean non convallis odio. Sed fringilla, ex in ultricies cursus, ipsum dolor interdum nulla, ut commodo sapien nisi quis est. Integer nec odio praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.

            Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.

            Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.

            Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

            Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.

            Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus.

            Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div> */}
      </div>
    </div>
  );
}