"use client"

import React from 'react';
import '../styles/Manual.css';
import Image from 'next/image';

//image imports:
import selectContent from '../images/screenshots/selectDashboardContent.png';
import defaultColours from '../images/screenshots/defaultColours.png';
import customColours from '../images/screenshots/customColours.png';

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
            Here, you'll discover a range of powerful tools that empower you as an administrator. From selecting and customizing graphs
            to managing media, adjusting colours, and handling administrators, you have the ability to streamline and optimize your system with ease. 
          </p>

          <div className='selectContent'>
            <h3>Selecting dashboard content</h3>
            <Image src={selectContent} alt = "selectContent"/>
            <ol>
              <li>Graph Display: Pick the graphs you want to see by checking their checkboxes. It's all about having the information that matters most to you.</li>
              <li>Graph Configuration: If you select a graph, you can customize it further. Set the sequence number to control its order and decide how long it stays on the screen by adjusting the duration.</li>
              <li>Sequence Number Validation: Keep your sequence numbers in order. If they're not consecutive, you will see an error message saying, "Sequence numbers must follow each other."</li>
              <li>Unique Sequence Numbers: Each graph needs its own special sequence number. Avoid duplicates to prevent an error message saying, "Sequence numbers must be unique."</li>
              <li>Duration Requirement: Make sure each graph is visible for more than 10 seconds. This gives viewers enough time to absorb the information and grasp its meaning.</li>
              <li>Selecting Media: This function works similarly to selecting graphs. You can also choose whether videos play with sound or without sound, giving you control over your media experience.</li>
              <li>When you're ready to apply all the changes you've made to the graphs and media selections, simply click on the "Apply Changes" button. This will update your dashboard with the new configurations you've chosen.</li>
            </ol>
          </div>

          <div className='adjustColours'>
            <h3>Adjusting colours</h3>
            <Image src={defaultColours} alt = "defaultColours"/>
            <ol>
              <li>Default Colours: In this section, the default colours for all graph variables are displayed.
                If you wish to revert back to the default colours, simply click on one of the provided buttons.</li>
            </ol>

            <Image src={customColours} alt = "customColours"/>
            <ol>
              <li>Custom Colours: Select custom colours for each variable using the drop-down menus associated with each variable. As you make colour selections,
                a preview of the chosen colour will be displayed next to the respective drop-down menu.</li>
              <li>Once you are happy with the selection, click the "Apply Changes" button. This will implement the
                 new colour scheme for the graph variables.</li>
            </ol>
          </div>

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