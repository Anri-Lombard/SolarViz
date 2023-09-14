"use client"

import React from 'react';
import '../styles/Manual.css';

export default function Manual() {

  const handleScroll = (event: React.MouseEvent, sectionId: string, offset = -110) => {
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
        <a href='#contribution' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'contribution')}>Contribution</a>
      </div>

      <div className='content'>

        <div id='about'>
          <h4>About</h4>
          <div className='mb-4'>
            <h2>SolarViz: Powering Sustainability at UCT D-Skool</h2>

            <h3>Introduction</h3>
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
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper, nunc et pellentesque facilisis, sapien nisl egestas diam, nec blandit elit metus ac erat. Fusce non bibendum dui. Vivamus commodo, sem et sollicitudin malesuada, est quam ultrices orci, a semper augue mauris ut quam.

            Phasellus finibus, mauris a efficitur aliquet, nulla massa venenatis nisl, id efficitur orci nunc at nulla. Proin non bibendum metus. Aenean non convallis odio. Sed fringilla, ex in ultricies cursus, ipsum dolor interdum nulla, ut commodo sapien nisi quis est. Integer nec odio praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.

            Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.

            Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.

            Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

            Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.
          </p>
        </div>
        <div id='administration'>
          <h4>Administration</h4>
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
        </div>
        <div id='contribution'>
          <h4>Contribution</h4>
          <div className='contribution'>
            <a href="https://www.flaticon.com/free-icons/line-chart" title="line chart icons">Line chart icons created by ibobicon - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/area-chart" title="area chart icons">Area chart icons created by Ajmal Naha - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/piechart" title="piechart icons">Piechart icons created by Lagot Design - Flaticon</a>
          </div>
        </div>
      </div>
      <div className='footerText'>
        <p>© 2023 SolarViz. All rights reserved.</p>
      </div>
    </div>
  );
}